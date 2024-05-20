"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onMessageHandler = void 0;
function onMessageHandler(onMessage) {
    return async (remoteMessage) => {
        onMessage?.(remoteMessage);
    };
}
exports.onMessageHandler = onMessageHandler;
