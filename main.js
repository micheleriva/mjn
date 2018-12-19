"use strict";
exports.__esModule = true;
function Nothing() {
    return void 0;
}
function Just(value) {
    return value === null ? Nothing() : value;
}
function mjn(obj, path) {
    var arrToPath = path
        .replace(/\[(\w+)\]/g, ".$1")
        .replace(/^\./, "")
        .split(".");
    try {
        for (var _i = 0, arrToPath_1 = arrToPath; _i < arrToPath_1.length; _i++) {
            var index = arrToPath_1[_i];
            if (index in obj) {
                obj = obj[index];
            }
            else {
                return Nothing();
            }
        }
        return Just(obj);
    }
    catch (err) {
        return Nothing();
    }
}
;
exports["default"] = mjn;
