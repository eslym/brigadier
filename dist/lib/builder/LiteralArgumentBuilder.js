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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.literal = void 0;
var LiteralCommandNode_1 = require("../tree/LiteralCommandNode");
var ArgumentBuilder_1 = require("./ArgumentBuilder");
var LiteralArgumentBuilder = /** @class */ (function (_super) {
    __extends(LiteralArgumentBuilder, _super);
    function LiteralArgumentBuilder(literal) {
        var _this = _super.call(this) || this;
        _this.literal = literal;
        return _this;
    }
    LiteralArgumentBuilder.literal = function (name) {
        return new LiteralArgumentBuilder(name);
    };
    LiteralArgumentBuilder.prototype.getThis = function () {
        return this;
    };
    LiteralArgumentBuilder.prototype.getLiteral = function () {
        return this.literal;
    };
    LiteralArgumentBuilder.prototype.build = function () {
        var e_1, _a;
        var result = new LiteralCommandNode_1.default(this.getLiteral(), this.getCommand(), this.getRequirement(), this.getRedirect(), this.getRedirectModifier(), this.isFork());
        try {
            for (var _b = __values(this.getArguments()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var arg = _c.value;
                result.addChild(arg);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    };
    return LiteralArgumentBuilder;
}(ArgumentBuilder_1.default));
exports.default = LiteralArgumentBuilder;
exports.literal = LiteralArgumentBuilder.literal;
//# sourceMappingURL=LiteralArgumentBuilder.js.map