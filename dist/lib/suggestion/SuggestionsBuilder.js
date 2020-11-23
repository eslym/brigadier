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
var StringRange_1 = require("../context/StringRange");
var Suggestion_1 = require("./Suggestion");
var Suggestions_1 = require("./Suggestions");
var IntegerSuggestion_1 = require("./IntegerSuggestion");
var SuggestionsBuilder = /** @class */ (function () {
    function SuggestionsBuilder(input, start) {
        this.result = [];
        this.input = input;
        this.start = start;
        this.remaining = input.substring(start);
    }
    SuggestionsBuilder.prototype.getInput = function () {
        return this.input;
    };
    SuggestionsBuilder.prototype.getStart = function () {
        return this.start;
    };
    SuggestionsBuilder.prototype.getRemaining = function () {
        return this.remaining;
    };
    SuggestionsBuilder.prototype.build = function () {
        return Suggestions_1.default.create(this.input, this.result);
    };
    SuggestionsBuilder.prototype.buildPromise = function () {
        return Promise.resolve(this.build());
    };
    SuggestionsBuilder.prototype.suggest = function (text, tooltip) {
        if (tooltip === void 0) { tooltip = null; }
        if (typeof text === "number") {
            this.result.push(new IntegerSuggestion_1.default(StringRange_1.default.between(this.start, this.input.length), text, tooltip));
            return this;
        }
        if (text === this.remaining)
            return this;
        this.result.push(new Suggestion_1.default(StringRange_1.default.between(this.start, this.input.length), text, tooltip));
        return this;
    };
    SuggestionsBuilder.prototype.add = function (other) {
        var _a;
        (_a = this.result).push.apply(_a, __spread(other.result));
        return this;
    };
    SuggestionsBuilder.prototype.createOffset = function (_) {
        return new SuggestionsBuilder(this.input, this.start);
    };
    SuggestionsBuilder.prototype.restart = function () {
        return new SuggestionsBuilder(this.input, this.start);
    };
    return SuggestionsBuilder;
}());
exports.default = SuggestionsBuilder;
//# sourceMappingURL=SuggestionsBuilder.js.map