"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EXAMPLES = ["true", "false"];
var BoolArgumentType = /** @class */ (function () {
    function BoolArgumentType() {
    }
    BoolArgumentType.bool = function () {
        return new BoolArgumentType();
    };
    BoolArgumentType.getBool = function (context, name) {
        return context.getArgument(name, Boolean);
    };
    BoolArgumentType.prototype.parse = function (reader) {
        return reader.readBoolean();
    };
    BoolArgumentType.prototype.listSuggestions = function (context, builder) {
        if ("true".startsWith(builder.getRemaining().toLowerCase())) {
            builder.suggest("true");
        }
        if ("false".startsWith(builder.getRemaining().toLowerCase())) {
            builder.suggest("false");
        }
        return builder.buildPromise();
    };
    BoolArgumentType.prototype.getExamples = function () {
        return EXAMPLES;
    };
    return BoolArgumentType;
}());
exports.default = BoolArgumentType;
//# sourceMappingURL=BoolArgumentType.js.map