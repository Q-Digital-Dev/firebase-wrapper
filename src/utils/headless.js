import messaging from '@react-native-firebase/messaging'
import { onMessageHandler } from './onMessageHandler';
import notifee from '@notifee/react-native';
import { onEventHandler } from './onEventHandler';

// событие пришедшего в фоне пуша
messaging().setBackgroundMessageHandler(onMessageHandler());

notifee.onBackgroundEvent(onEventHandler());
