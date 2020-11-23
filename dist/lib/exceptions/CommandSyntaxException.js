"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BuiltInExceptions_1 = require("./BuiltInExceptions");
var CommandSyntaxException = /** @class */ (function (_super) {
    __extends(CommandSyntaxException, _super);
    function CommandSyntaxException(type, message, input, cursor) {
        if (input === void 0) { input = null; }
        if (cursor === void 0) { cursor = -1; }
        var _this = _super.call(this, message.getString()) || this;
        Error.captureStackTrace(_this, CommandSyntaxException);
        _this.type = type;
        _this.__message = message;
        _this.input = input;
        _this.cursor = cursor;
        return _this;
    }
    CommandSyntaxException.prototype.getMessage = function () {
        var message = this.__message.getString();
        var context = this.getContext();
        if (context != null) {
            message += " at position " + this.cursor + ": " + context;
        }
        return message;
    };
    CommandSyntaxException.prototype.getRawMessage = function () {
        return this.__message;
    };
    CommandSyntaxException.prototype.getContext = function () {
        if (this.input == null || this.cursor < 0) {
            return null;
        }
        var builder = "";
        var cursor = Math.min(this.input.length, this.cursor);
        if (cursor > CommandSyntaxException.CONTEXT_AMOUNT) {
            builder += "...";
        }
        builder += this.input.substring(Math.max(0, cursor - CommandSyntaxException.CONTEXT_AMOUNT), cursor);
        builder += "<--[HERE]";
        return builder;
    };
    CommandSyntaxException.prototype.getType = function () {
        return this.type;
    };
    CommandSyntaxException.prototype.getInput = function () {
        return this.input;
    };
    CommandSyntaxException.prototype.getCursor = function () {
        return this.cursor;
    };
    CommandSyntaxException.prototype.toString = function () {
        return this.message;
    };
    CommandSyntaxException.CONTEXT_AMOUNT = 10;
    CommandSyntaxException.BUILT_IN_EXCEPTIONS = new BuiltInExceptions_1.default();
    return CommandSyntaxException;
}(Error));
exports.default = CommandSyntaxException;
//# sourceMappingURL=CommandSyntaxException.js.map