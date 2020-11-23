"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual_1 = require("../util/isEqual");
var Suggestion = /** @class */ (function () {
    function Suggestion(range, text, tooltip) {
        if (tooltip === void 0) { tooltip = null; }
        this.range = range;
        this.text = text;
        this.tooltip = tooltip;
    }
    Suggestion.prototype.getRange = function () {
        return this.range;
    };
    Suggestion.prototype.getText = function () {
        return this.text;
    };
    Suggestion.prototype.getTooltip = function () {
        return this.tooltip;
    };
    Suggestion.prototype.apply = function (input) {
        if (this.range.getStart() === 0 && this.range.getEnd() == input.length) {
            return this.text;
        }
        var result = "";
        if (this.range.getStart() > 0) {
            result += input.substring(0, this.range.getStart());
        }
        result += this.text;
        if (this.range.getEnd() < input.length) {
            result += input.substring(this.range.getEnd());
        }
        return result;
    };
    Suggestion.prototype.equals = function (o) {
        if (this === o)
            return true;
        if (!(o instanceof Suggestion))
            return false;
        return isEqual_1.default(this.range, o.range) && (this.text === o.text) && isEqual_1.default(this.tooltip, o.tooltip);
    };
    Suggestion.prototype.toString = function () {
        return "Suggestion{" +
            "range=" + this.range +
            ", text='" + this.text + '\'' +
            ", tooltip='" + this.tooltip + '\'' +
            '}';
    };
    Suggestion.prototype.compareTo = function (o) {
        return this.text < o.text ? 1 : -1;
    };
    Suggestion.prototype.compareToIgnoreCase = function (b) {
        return this.text.toLowerCase() < b.text.toLowerCase() ? 1 : -1;
    };
    Suggestion.prototype.expand = function (command, range) {
        if (range.equals(this.range)) {
            return this;
        }
        var result = "";
        if (range.getStart() < this.range.getStart()) {
            result += command.substring(range.getStart(), this.range.getStart());
        }
        result += this.text;
        if (range.getEnd() > this.range.getEnd()) {
            result += command.substring(this.range.getEnd(), range.getEnd());
        }
        return new Suggestion(range, result, this.tooltip);
    };
    return Suggestion;
}());
exports.default = Suggestion;
//# sourceMappingURL=Suggestion.js.map