"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchStringInObject = void 0;
function searchStringInObject(search, obj) {
    for (let key in obj) {
        if (typeof obj[key] === 'object') {
            if (searchStringInObject(search, obj[key])) {
                return true;
            }
        }
        else if (typeof obj[key] === 'string') {
            if (obj[key].includes(search)) {
                return true;
            }
        }
    }
    return false;
}
exports.searchStringInObject = searchStringInObject;
