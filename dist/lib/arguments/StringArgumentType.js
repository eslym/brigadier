"use strict";
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
exports.StringType = void 0;
var StringReader_1 = require("../StringReader");
var StringType;
(function (StringType) {
    StringType["SINGLE_WORD"] = "words_with_underscores";
    StringType["QUOTABLE_PHRASE"] = "\"quoted phrase\"";
    StringType["GREEDY_PHRASE"] = "words with spaces";
})(StringType = exports.StringType || (exports.StringType = {}));
var StringArgumentType = /** @class */ (function () {
    function StringArgumentType(type) {
        this.type = type;
    }
    StringArgumentType.word = function () {
        return new StringArgumentType(StringType.SINGLE_WORD);
    };
    StringArgumentType.string = function () {
        return new StringArgumentType(StringType.QUOTABLE_PHRASE);
    };
    StringArgumentType.greedyString = function () {
        return new StringArgumentType(StringType.GREEDY_PHRASE);
    };
    StringArgumentType.getString = function (context, name) {
        return context.getArgument(name, String);
    };
    StringArgumentType.prototype.getType = function () {
        return this.type;
    };
    StringArgumentType.prototype.parse = function (reader) {
        if (this.type == StringType.GREEDY_PHRASE) {
            var text = reader.getRemaining();
            reader.setCursor(reader.getTotalLength());
            return text;
        }
        else if (this.type == StringType.SINGLE_WORD) {
            return reader.readUnquotedString();
        }
        else {
            return reader.readString();
        }
    };
    StringArgumentType.prototype.toString = function () {
        return "string()";
    };
    StringArgumentType.escapeIfRequired = function (input) {
        var e_1, _a;
        try {
            for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
                var c = input_1_1.value;
                if (!StringReader_1.default.isAllowedInUnquotedString(c)) {
                    return StringArgumentType.escape(input);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return input;
    };
    StringArgumentType.escape = function (input) {
        var result = "\"";
        for (var i = 0; i < input.length; i++) {
            var c = input.charAt(i);
            if (c == '\\' || c == '"') {
                result += '\\';
            }
            result += c;
        }
        result += "\"";
        return result;
    };
    return StringArgumentType;
}());
exports.default = StringArgumentType;
//# sourceMappingURL=StringArgumentType.js.map