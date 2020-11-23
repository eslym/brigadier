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
var isEqual_1 = require("../util/isEqual");
var StringRange_1 = require("../context/StringRange");
var Suggestions = /** @class */ (function () {
    function Suggestions(range, suggestions) {
        this.range = range;
        this.suggestions = suggestions;
    }
    Suggestions.prototype.getRange = function () {
        return this.range;
    };
    Suggestions.prototype.getList = function () {
        return this.suggestions;
    };
    Suggestions.prototype.isEmpty = function () {
        return this.suggestions.length === 0;
    };
    Suggestions.prototype.equals = function (o) {
        if (this === o)
            return true;
        if (!(o instanceof Suggestions))
            return false;
        return this.range.equals(o.range) && isEqual_1.default(this.suggestions, o.suggestions);
    };
    Suggestions.prototype.toString = function () {
        return "Suggestions{" +
            "range=" + this.range +
            ", suggestions=" + this.suggestions + '}';
    };
    Suggestions.empty = function () {
        return Promise.resolve(this.EMPTY);
    };
    Suggestions.merge = function (command, input) {
        var e_1, _a;
        if (input.length === 0) {
            return this.EMPTY;
        }
        else if (input.length === 1) {
            return input[0];
        }
        var texts = [];
        try {
            for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
                var suggestions = input_1_1.value;
                texts.push.apply(texts, __spread(suggestions.getList()));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return Suggestions.create(command, texts);
    };
    Suggestions.create = function (command, suggestions) {
        var e_2, _a, e_3, _b;
        if (suggestions.length === 0) {
            return this.EMPTY;
        }
        var start = Infinity;
        var end = -Infinity;
        try {
            for (var suggestions_1 = __values(suggestions), suggestions_1_1 = suggestions_1.next(); !suggestions_1_1.done; suggestions_1_1 = suggestions_1.next()) {
                var suggestion = suggestions_1_1.value;
                start = Math.min(suggestion.getRange().getStart(), start);
                end = Math.max(suggestion.getRange().getEnd(), end);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (suggestions_1_1 && !suggestions_1_1.done && (_a = suggestions_1.return)) _a.call(suggestions_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var range = new StringRange_1.default(start, end);
        var texts = [];
        try {
            for (var suggestions_2 = __values(suggestions), suggestions_2_1 = suggestions_2.next(); !suggestions_2_1.done; suggestions_2_1 = suggestions_2.next()) {
                var suggestion = suggestions_2_1.value;
                texts.push(suggestion.expand(command, range));
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (suggestions_2_1 && !suggestions_2_1.done && (_b = suggestions_2.return)) _b.call(suggestions_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        var sorted = texts.sort(function (a, b) { return a.compareToIgnoreCase(b); });
        return new Suggestions(range, sorted);
    };
    Suggestions.EMPTY = new Suggestions(StringRange_1.default.at(0), []);
    return Suggestions;
}());
exports.default = Suggestions;
//# sourceMappingURL=Suggestions.js.map