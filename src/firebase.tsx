import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging'
import { Platform } from 'react-native'
import notifee, { AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';
import { BACKGROUND_STORAGE_NAME, FirebaseP } from './firebase.options'
import _ from 'lodash';
import { onMessageHandler } from './utils/onMessageHandler';
import { onEventHandler } from './utils/onEventHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Firebase({
  ignoreRegisterByPlatform,
  channelId,
  smallIcon,
  appState,
  onToken,
  onMessage,
  onPress
}: FirebaseP) {

  async function start() {
    if (!ignoreRegisterByPlatform.find((os) => os === Platform.OS)) {
      await messaging().registerDeviceForRemoteMessages()
    }
    messaging().onTokenRefresh(onToken)

    const token = await messaging().getToken()
    onToken(token)

    await notifee.requestPermission({
      badge: true,
      sound: true,
    })

    await notifee.createChannel({
      id: channelId,
      name: channelId,
      lights: true,
      sound: 'default',
      vibration: true,
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    })

    messaging().onMessage(async (remoteMessage) => {
      await onMessageHandler(onMessage)(remoteMessage)
      const { notification, data, messageId } = remoteMessage
      if (notification) {
        const { android, ...other } = notification
        if (Platform.OS === 'android') {
          await notifee.displayNotification({
            data,
            id: messageId,
            android: {
              ...android,
              channelId: android?.channelId || channelId,
              smallIcon: android?.smallIcon || smallIcon,
              pressAction: {
                id: 'default',
              }
            },
            ...other
          } as any)
        }
      }
    })
    notifee.onForegroundEvent(onEventHandler(onPress));
  }

  async function onInitialNotification() {
    try {
      const initialNotification = (await messaging().getInitialNotification() || (await notifee.getInitialNotification())?.notification)
      if (initialNotification) {
        onEventHandler(onPress)({ type: EventType.PRESS, detail: { notification: initialNotification } })

        return true
      }

      return false
    } catch (error) {
      return false
    }
  }

  async function onBackgroundMessageAfterAppActive() {
    const currentMessages = await AsyncStorage.getItem(BACKGROUND_STORAGE_NAME) || JSON.stringify([]);
    const messageArray = JSON.parse(currentMessages);
    for (let index = 0; index < messageArray.length; index++) {
      const message = messageArray[index];
      onMessage?.(message)
    }
    await AsyncStorage.setItem(BACKGROUND_STORAGE_NAME, JSON.stringify([]))
  }

  useEffect(() => {
    start()
  }, [])

  useEffect(() => {
    if (appState === 'active') {
      onInitialNotification()
        .then(onBackgroundMessageAfterAppActive)
    }
  }, [appState, onPress])

  return (
    null
  )
}