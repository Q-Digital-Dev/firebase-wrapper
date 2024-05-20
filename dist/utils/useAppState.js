"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppState = void 0;
const react_1 = require("react");
const react_native_1 = require("react-native");
function useAppState() {
    const [appState, setAppState] = (0, react_1.useState)(react_native_1.AppState.currentState);
    (0, react_1.useEffect)(() => {
        const subscription = react_native_1.AppState.addEventListener('change', setAppState);
        return () => {
            subscription.remove();
        };
    }, []);
    return appState;
}
exports.useAppState = useAppState;
