"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onEventHandler = void 0;
const react_native_1 = require("@notifee/react-native");
function onEventHandler(onPress) {
    return async ({ type, detail }) => {
        if (type === react_native_1.EventType.PRESS) {
            onPress?.(detail.notification);
            return true;
        }
        return;
    };
}
exports.onEventHandler = onEventHandler;
