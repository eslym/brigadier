"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandSyntaxException_1 = require("./CommandSyntaxException");
var SimpleCommandExceptionType = /** @class */ (function () {
    function SimpleCommandExceptionType(message) {
        this.message = message;
        Error.captureStackTrace(this, SimpleCommandExceptionType);
    }
    SimpleCommandExceptionType.prototype.create = function () {
        return new CommandSyntaxException_1.default(this, this.message);
    };
    SimpleCommandExceptionType.prototype.createWithContext = function (reader) {
        return new CommandSyntaxException_1.default(this, this.message, reader.getString(), reader.getCursor());
    };
    SimpleCommandExceptionType.prototype.toString = function () {
        return this.message.getString();
    };
    return SimpleCommandExceptionType;
}());
exports.default = SimpleCommandExceptionType;
//# sourceMappingURL=SimpleCommandExceptionType.js.map