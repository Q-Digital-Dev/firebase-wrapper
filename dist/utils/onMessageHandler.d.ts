import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
export declare function onMessageHandler(onMessage?: (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => void): (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => Promise<void>;
