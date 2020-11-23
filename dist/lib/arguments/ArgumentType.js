"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultType = void 0;
var BoolArgumentType_1 = require("./BoolArgumentType");
var IntegerArgumentType_1 = require("./IntegerArgumentType");
var FloatArgumentType_1 = require("./FloatArgumentType");
var StringArgumentType_1 = require("./StringArgumentType");
exports.DefaultType = {
    bool: BoolArgumentType_1.default.bool,
    integer: IntegerArgumentType_1.default.integer,
    float: FloatArgumentType_1.default.float,
    word: StringArgumentType_1.default.word,
    string: StringArgumentType_1.default.string,
    greedyString: StringArgumentType_1.default.greedyString
};
//# sourceMappingURL=ArgumentType.js.map