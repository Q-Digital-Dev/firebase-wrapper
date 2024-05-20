import { Event, Notification } from "@notifee/react-native";
export declare function onEventHandler(onPress?: (notification?: Notification) => void): ({ type, detail }: Event) => Promise<true | undefined>;
