"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Firebase = void 0;
const react_1 = require("react");
const messaging_1 = __importDefault(require("@react-native-firebase/messaging"));
const react_native_1 = require("react-native");
const react_native_2 = __importStar(require("@notifee/react-native"));
const onMessageHandler_1 = require("./utils/onMessageHandler");
const onEventHandler_1 = require("./utils/onEventHandler");
function Firebase({ ignoreRegisterByPlatform, channelId, smallIcon, appState, onToken, onMessage, onPress }) {
    async function start() {
        if (!ignoreRegisterByPlatform.find((os) => os === react_native_1.Platform.OS)) {
            await (0, messaging_1.default)().registerDeviceForRemoteMessages();
        }
        (0, messaging_1.default)().onTokenRefresh(onToken);
        const token = await (0, messaging_1.default)().getToken();
        onToken(token);
        await react_native_2.default.requestPermission({
            badge: true,
            sound: true,
        });
        await react_native_2.default.createChannel({
            id: channelId,
            name: channelId,
            lights: true,
            sound: 'default',
            vibration: true,
            importance: react_native_2.AndroidImportance.HIGH,
            visibility: react_native_2.AndroidVisibility.PUBLIC,
        });
        (0, messaging_1.default)().onMessage(async (remoteMessage) => {
            await (0, onMessageHandler_1.onMessageHandler)(onMessage)(remoteMessage);
            const { notification, data, messageId } = remoteMessage;
            if (notification) {
                const { android, ...other } = notification;
                if (react_native_1.Platform.OS === 'android') {
                    await react_native_2.default.displayNotification({
                        data,
                        id: messageId,
                        android: {
                            ...android,
                            channelId: android?.channelId || channelId,
                            smallIcon: android?.smallIcon || smallIcon,
                            pressAction: {
                                id: 'default',
                            }
                        },
                        ...other
                    });
                }
            }
        });
        react_native_2.default.onForegroundEvent((0, onEventHandler_1.onEventHandler)(onPress));
    }
    async function onInitialNotification() {
        const initialNotification = (await (0, messaging_1.default)().getInitialNotification() || (await react_native_2.default.getInitialNotification())?.notification);
        if (initialNotification) {
            (0, onEventHandler_1.onEventHandler)(onPress)({ type: react_native_2.EventType.PRESS, detail: { notification: initialNotification } });
        }
    }
    (0, react_1.useEffect)(() => {
        start();
    }, []);
    (0, react_1.useEffect)(() => {
        if (appState === 'active') {
            onInitialNotification();
        }
    }, [appState, onPress]);
    return (null);
}
exports.Firebase = Firebase;
