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
var Suggestion_1 = require("./Suggestion");
var IntegerSuggestion = /** @class */ (function (_super) {
    __extends(IntegerSuggestion, _super);
    function IntegerSuggestion(range, value, tooltip) {
        if (tooltip === void 0) { tooltip = null; }
        var _this = _super.call(this, range, value.toString(), tooltip) || this;
        _this.value = value;
        return _this;
    }
    IntegerSuggestion.prototype.getValue = function () {
        return this.value;
    };
    IntegerSuggestion.prototype.equals = function (o) {
        if (this === o)
            return true;
        if (!(o instanceof IntegerSuggestion))
            return false;
        return this.value == o.value && _super.prototype.equals.call(this, o);
    };
    IntegerSuggestion.prototype.toString = function () {
        return "IntegerSuggestion{" +
            "value=" + this.value +
            ", range=" + this.getRange() +
            ", text='" + this.getText() + '\'' +
            ", tooltip='" + this.getTooltip() + '\'' +
            '}';
    };
    IntegerSuggestion.prototype.compareTo = function (o) {
        if (o instanceof IntegerSuggestion) {
            return this.value < o.value ? 1 : -1;
        }
        return _super.prototype.compareTo.call(this, o);
    };
    IntegerSuggestion.prototype.compareToIgnoreCase = function (b) {
        return this.compareTo(b);
    };
    return IntegerSuggestion;
}(Suggestion_1.default));
exports.default = IntegerSuggestion;
//# sourceMappingURL=IntegerSuggestion.js.map