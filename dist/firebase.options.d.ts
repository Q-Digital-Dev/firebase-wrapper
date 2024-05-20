import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import { Notification } from '@notifee/react-native';
import { Platform } from "react-native";
export type FirebaseItem = {
    token: string;
};
export type FirebaseP = {
    ignoreRegisterByPlatform: Array<typeof Platform.OS>;
    channelId: string;
    smallIcon: string;
    onToken(token: string): void;
    onMessage?(remoteMessage: FirebaseMessagingTypes.RemoteMessage): void;
    onPress?(notification?: Notification): void;
};
export declare const FIREBASE_MESSAGES_STORE_NAME = "firebaseMessagesStoreName";
