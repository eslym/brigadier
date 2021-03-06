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
Object.defineProperty(exports, "__esModule", { value: true });
var CommandSyntaxException_1 = require("./CommandSyntaxException");
var DynamicCommandExceptionType = /** @class */ (function () {
    function DynamicCommandExceptionType(fn) {
        this.fn = fn;
        Error.captureStackTrace(this, DynamicCommandExceptionType);
    }
    DynamicCommandExceptionType.prototype.create = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new CommandSyntaxException_1.default(this, this.fn.apply(this, __spread(args)));
    };
    DynamicCommandExceptionType.prototype.createWithContext = function (reader) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new CommandSyntaxException_1.default(this, this.fn.apply(this, __spread(args)), reader.getString(), reader.getCursor());
    };
    return DynamicCommandExceptionType;
}());
exports.default = DynamicCommandExceptionType;
//# sourceMappingURL=DynamicCommandExceptionType.js.map