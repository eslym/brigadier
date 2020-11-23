"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
function isEqual(a, b) {
    if (a === b)
        return true;
    if (typeof a != typeof b)
        return false;
    if (!(a instanceof Object))
        return false;
    if (typeof a === "function")
        return a.toString() === b.toString();
    if (a.constructor !== b.constructor)
        return false;
    if (a instanceof Map)
        return isMapEqual(a, b);
    if (a instanceof Set)
        return isArrayEqual(__spread(a), __spread(b));
    if (a instanceof Array)
        return isArrayEqual(a, b);
    if (typeof a === "object")
        return isObjectEqual(a, b);
    return false;
}
exports.default = isEqual;
function isMapEqual(a, b) {
    var e_1, _a;
    if (a.size != b.size)
        return false;
    try {
        for (var a_1 = __values(a), a_1_1 = a_1.next(); !a_1_1.done; a_1_1 = a_1.next()) {
            var _b = __read(a_1_1.value, 2), key = _b[0], val = _b[1];
            var testVal = b.get(key);
            if (!isEqual(testVal, val))
                return false;
            if (testVal === undefined && !b.has(key))
                return false;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (a_1_1 && !a_1_1.done && (_a = a_1.return)) _a.call(a_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
}
function isArrayEqual(a, b) {
    if (a.length != b.length)
        return false;
    for (var i = 0; i < a.length; i++)
        if (!isEqual(a[i], b[i]))
            return false;
    return true;
}
function isObjectEqual(a, b) {
    var aKeys = Object.keys(a);
    var bKeys = Object.keys(b);
    if (aKeys.length != bKeys.length)
        return false;
    if (!aKeys.every(function (key) { return b.hasOwnProperty(key); }))
        return false;
    return aKeys.every(function (key) {
        return isEqual(a[key], b[key]);
    });
}
//# sourceMappingURL=isEqual.js.map