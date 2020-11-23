"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandSyntaxException_1 = require("../exceptions/CommandSyntaxException");
var EXAMPLES = ["0", "123", "-123"];
var IntegerArgumentType = /** @class */ (function () {
    function IntegerArgumentType(minimum, maximum) {
        this.minimum = minimum;
        this.maximum = maximum;
    }
    IntegerArgumentType.integer = function (min, max) {
        if (min === void 0) { min = -Infinity; }
        if (max === void 0) { max = Infinity; }
        return new IntegerArgumentType(min, max);
    };
    IntegerArgumentType.getInteger = function (context, name) {
        return context.getArgument(name, Number);
    };
    IntegerArgumentType.prototype.getMinimum = function () {
        return this.minimum;
    };
    IntegerArgumentType.prototype.getMaximum = function () {
        return this.maximum;
    };
    IntegerArgumentType.prototype.parse = function (reader) {
        var start = reader.getCursor();
        var result = reader.readInt();
        if (result < this.minimum) {
            reader.setCursor(start);
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.integerTooLow().createWithContext(reader, result, this.minimum);
        }
        if (result > this.maximum) {
            reader.setCursor(start);
            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.integerTooHigh().createWithContext(reader, result, this.maximum);
        }
        return result;
    };
    IntegerArgumentType.prototype.equals = function (o) {
        if (this === o)
            return true;
        if (!(o instanceof IntegerArgumentType))
            return false;
        return this.maximum == o.maximum && this.minimum == o.minimum;
    };
    IntegerArgumentType.prototype.toString = function () {
        if (this.minimum === -Infinity && this.maximum === Infinity) {
            return "integer()";
        }
        else if (this.maximum == Infinity) {
            return "integer(" + this.minimum + ")";
        }
        else {
            return "integer(" + this.minimum + ", " + this.maximum + ")";
        }
    };
    IntegerArgumentType.prototype.getExamples = function () {
        return EXAMPLES;
    };
    return IntegerArgumentType;
}());
exports.default = IntegerArgumentType;
//# sourceMappingURL=IntegerArgumentType.js.map