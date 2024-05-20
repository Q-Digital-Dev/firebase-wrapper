import { Event, EventType, Notification } from "@notifee/react-native";

export function onEventHandler(onPress?: (notification?: Notification) => void) {
  return async ({ type, detail }: Event) => {
    if (type === EventType.PRESS) {
      onPress?.(detail.notification)
      return true
    }

    return
  }
}