import messaging from '@react-native-firebase/messaging'
import { onMessageHandler } from './onMessageHandler';
import notifee from '@notifee/react-native';
import { onEventHandler } from './onEventHandler';

export function headless() {
  messaging().setBackgroundMessageHandler(onMessageHandler());

  notifee.onBackgroundEvent(onEventHandler());
}