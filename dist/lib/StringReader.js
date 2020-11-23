"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandSyntaxException_1 = require("./exceptions/CommandSyntaxException");
var SYNTAX_ESCAPE = '\\';
var SYNTAX_QUOTE = '\"';
var StringReader = /** @class */ (function () {
    function StringReader(other) {
        this.cursor = 0;
        if (typeof other === "string") {
            this.string = other;
        }
        else {
            this.string = other.string;
            this.cursor = other.cursor;
        }
    }
    StringReader.prototype.getString = function () {
        return this.string;
    };
    StringReader.prototype.setCursor = function (cursor) {
        this.cursor = cursor;
    };
    StringReader.prototype.getRemainingLength = function () {
        return (this.string.length - this.cursor);
    };
    StringReader.prototype.getTotalLength = function () {
        return this.string.length;
    };
    StringReader.prototype.getCursor = function () {
        return this.cursor;
    };
    StringReader.prototype.getRead = function () {
        return this.string.substring(0, this.cursor);
    };
    StringReader.prototype.getRemaining = function () {
        return this.string.substring(this.cursor);
    };
    StringReader.prototype.canRead = function (length) {
        if (length === void 0) { length = 1; }
        return this.cursor + length <= this.string.length;
    };
    StringReader.prototype.peek = function (offset) {
        if (offset === void 0) { offset = 0; }
        return this.string.charAt(this.cursor + offset);
    };
    StringReader.prototype.read = function () {
        return this.string.charAt(this.cursor++);
    };
    StringReader.prototype.skip = function () {
        this.cursor++;
    };
    StringReader.isAllowedNumber = function (c) {
        return c >= '0' && c <= '9' || c == '.' || c == '-' || c == '+' || c == 'e' || c == 'E';
    };
    StringReader.prototype.skipWhitespace = function () {
        while ((this.canRead() && /\s/.test(this.peek()))) {
            this.skip();
        }
    };
    StringReader.prototype.readInt = function () {
        var start = this.cursor;
        while (this.canRead() && StringReader.isAllowedNumber(this.peek())) {
            this.skip();
        }
        var number = this.string.substring(start, this.cursor);
        if (number.length === 0) {
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerExpectedInt().createWithContext(this);
        }
        var result = parseFloat(number);
        if (isNaN(result) || result !== Math.round(result)) {
            this.cursor = start;
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerInvalidInt().createWithContext(this, number);
        }
        else
            return result;
    };
    StringReader.prototype.readFloat = function () {
        var start = this.cursor;
        while ((this.canRead() && StringReader.isAllowedNumber(this.peek()))) {
            this.skip();
        }
        var number = this.string.substring(start, this.cursor);
        if (number.length === 0) {
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerExpectedFloat().createWithContext(this);
        }
        var result = parseFloat(number);
        if (isNaN(result) || result !== Number(number)) {
            this.cursor = start;
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerInvalidFloat().createWithContext(this, number);
        }
        else
            return result;
    };
    StringReader.isAllowedInUnquotedString = function (c) {
        return c >= '0' && c <= '9'
            || c >= 'A' && c <= 'Z'
            || c >= 'a' && c <= 'z'
            || c == '_' || c == '-'
            || c == '.' || c == '+';
    };
    StringReader.prototype.readUnquotedString = function () {
        var start = this.cursor;
        while (this.canRead() && StringReader.isAllowedInUnquotedString(this.peek())) {
            this.skip();
        }
        return this.string.substring(start, this.cursor);
    };
    StringReader.prototype.readQuotedString = function () {
        if (!this.canRead()) {
            return "";
        }
        else if ((this.peek() != SYNTAX_QUOTE)) {
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerExpectedStartOfQuote().createWithContext(this);
        }
        this.skip();
        var result = "";
        var escaped = false;
        while (this.canRead()) {
            var c = this.read();
            if (escaped) {
                if (c == SYNTAX_QUOTE || c == SYNTAX_ESCAPE) {
                    result += c;
                    escaped = false;
                }
                else {
                    this.setCursor(this.getCursor() - 1);
                    throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerInvalidEscape().createWithContext(this, c);
                }
            }
            else if (c == SYNTAX_ESCAPE) {
                escaped = true;
            }
            else if (c == SYNTAX_QUOTE) {
                return result;
            }
            else {
                result += c;
            }
        }
        throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerExpectedEndOfQuote().createWithContext(this);
    };
    StringReader.prototype.readString = function () {
        if (this.canRead() && (this.peek() === SYNTAX_QUOTE)) {
            return this.readQuotedString();
        }
        else {
            return this.readUnquotedString();
        }
    };
    StringReader.prototype.readBoolean = function () {
        var start = this.cursor;
        var value = this.readString();
        if (value.length === 0) {
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerExpectedBool().createWithContext(this);
        }
        if (value === "true") {
            return true;
        }
        else if (value === "false") {
            return false;
        }
        else {
            this.cursor = start;
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerInvalidBool().createWithContext(this, value);
        }
    };
    StringReader.prototype.expect = function (c) {
        if (!this.canRead() || this.peek() !== c) {
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.readerExpectedSymbol().createWithContext(this, c);
        }
        this.skip();
    };
    return StringReader;
}());
exports.default = StringReader;
//# sourceMappingURL=StringReader.js.map