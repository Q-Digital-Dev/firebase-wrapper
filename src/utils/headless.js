import messaging from '@react-native-firebase/messaging'
import { onMessageHandler } from './onMessageHandler';
import notifee from '@notifee/react-native';
import { onEventHandler } from './onEventHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKGROUND_STORAGE_NAME } from '../firebase.options';

export function headless() {
  messaging().setBackgroundMessageHandler(onMessageHandler(async (remoteMessage) => {
    const currentMessages = await AsyncStorage.getItem(BACKGROUND_STORAGE_NAME) || JSON.stringify([]);
    const messageArray = JSON.parse(currentMessages);
    messageArray.push(remoteMessage);
    await AsyncStorage.setItem(BACKGROUND_STORAGE_NAME, JSON.stringify(messageArray));
  }));

  notifee.onBackgroundEvent(onEventHandler());
}