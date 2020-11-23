"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandSyntaxException_1 = require("../exceptions/CommandSyntaxException");
var EXAMPLES = ["0", "1.2", ".5", "-1", "-.5", "-1234.56"];
var FloatArgumentType = /** @class */ (function () {
    function FloatArgumentType(minimum, maximum) {
        this.minimum = minimum;
        this.maximum = maximum;
    }
    FloatArgumentType.float = function (min, max) {
        if (min === void 0) { min = -Infinity; }
        if (max === void 0) { max = Infinity; }
        return new FloatArgumentType(min, max);
    };
    FloatArgumentType.getFloat = function (context, name) {
        return context.getArgument(name, Number);
    };
    FloatArgumentType.prototype.getMinimum = function () {
        return this.minimum;
    };
    FloatArgumentType.prototype.getMaximum = function () {
        return this.maximum;
    };
    FloatArgumentType.prototype.parse = function (reader) {
        var start = reader.getCursor();
        var result = reader.readFloat();
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
    FloatArgumentType.prototype.equals = function (o) {
        if (this === o)
            return true;
        if (!(o instanceof FloatArgumentType))
            return false;
        return this.maximum == o.maximum && this.minimum == o.minimum;
    };
    FloatArgumentType.prototype.toString = function () {
        if (this.minimum === -Infinity && this.maximum === Infinity) {
            return "float()";
        }
        else if (this.maximum == Infinity) {
            return "float(" + this.minimum + ")";
        }
        else {
            return "float(" + this.minimum + ", " + this.maximum + ")";
        }
    };
    FloatArgumentType.prototype.getExamples = function () {
        return EXAMPLES;
    };
    return FloatArgumentType;
}());
exports.default = FloatArgumentType;
//# sourceMappingURL=FloatArgumentType.js.map