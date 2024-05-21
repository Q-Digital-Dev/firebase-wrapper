import { FirebaseMessagingTypes } from "@react-native-firebase/messaging"
import { Notification } from '@notifee/react-native';
import { AppStateStatus, Platform } from "react-native";

export type FirebaseP = {
  ignoreRegisterByPlatform: Array<typeof Platform.OS>
  channelId: string
  smallIcon: string
  appState: AppStateStatus

  onToken(token: string): void
  onMessage?(remoteMessage: FirebaseMessagingTypes.RemoteMessage & {
    isBackground?: boolean
  }): void
  onPress?(notification?: Notification): void
}

export const BACKGROUND_STORAGE_NAME = 'backgroundStorageName'