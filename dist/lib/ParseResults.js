"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringReader_1 = require("./StringReader");
var ParseResults = /** @class */ (function () {
    function ParseResults(context, reader, exceptions) {
        this.context = context;
        this.reader = reader || new StringReader_1.default("");
        this.exceptions = exceptions || new Map();
    }
    ParseResults.prototype.getContext = function () {
        return this.context;
    };
    ParseResults.prototype.getReader = function () {
        return this.reader;
    };
    ParseResults.prototype.getExceptions = function () {
        return this.exceptions;
    };
    return ParseResults;
}());
exports.default = ParseResults;
//# sourceMappingURL=ParseResults.js.map