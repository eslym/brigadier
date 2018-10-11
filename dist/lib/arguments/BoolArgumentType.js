"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EXAMPLES = new Set(["true", "false"]).values();
class BoolArgumentType {
    constructor() {
    }
    static bool() {
        return new BoolArgumentType();
    }
    static getBool(context, name) {
        return context.getArgument(name, 2 /* Boolean */);
    }
    parse(reader) {
        return reader.readBoolean();
    }
    listSuggestions(context, builder) {
        if ("true".startsWith(builder.getRemaining().toLowerCase())) {
            builder.suggest("true");
        }
        if ("false".startsWith(builder.getRemaining().toLowerCase())) {
            builder.suggest("false");
        }
        return builder.buildPromise();
    }
    getExamples() {
        return EXAMPLES;
    }
}
exports.default = BoolArgumentType;