"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringRange_1 = require("./StringRange");
var ParsedArgument = /** @class */ (function () {
    function ParsedArgument(start, end, result) {
        this.range = StringRange_1.default.between(start, end);
        this.result = result;
    }
    ParsedArgument.prototype.getRange = function () {
        return this.range;
    };
    ParsedArgument.prototype.getResult = function () {
        return this.result;
    };
    ParsedArgument.prototype.equals = function (o) {
        if (this === o)
            return true;
        if (!(o instanceof ParsedArgument))
            return false;
        return this.range.equals(o.range) && this.result === o.result;
    };
    return ParsedArgument;
}());
exports.default = ParsedArgument;
//# sourceMappingURL=ParsedArgument.js.map