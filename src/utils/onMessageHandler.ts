import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

export function onMessageHandler(onMessage?: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => void) {
  return async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    onMessage?.(remoteMessage)
  }
}