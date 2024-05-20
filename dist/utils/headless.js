"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headless = void 0;
const messaging_1 = __importDefault(require("@react-native-firebase/messaging"));
const onMessageHandler_1 = require("./onMessageHandler");
const react_native_1 = __importDefault(require("@notifee/react-native"));
const onEventHandler_1 = require("./onEventHandler");
function headless() {
    (0, messaging_1.default)().setBackgroundMessageHandler((0, onMessageHandler_1.onMessageHandler)());
    react_native_1.default.onBackgroundEvent((0, onEventHandler_1.onEventHandler)());
}
exports.headless = headless;
