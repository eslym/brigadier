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
exports.argument = void 0;
var ArgumentCommandNode_1 = require("../tree/ArgumentCommandNode");
var ArgumentBuilder_1 = require("./ArgumentBuilder");
var RequiredArgumentBuilder = /** @class */ (function (_super) {
    __extends(RequiredArgumentBuilder, _super);
    function RequiredArgumentBuilder(name, type) {
        var _this = _super.call(this) || this;
        _this.name = name;
        _this.type = type;
        return _this;
    }
    RequiredArgumentBuilder.argument = function (name, type) {
        return new RequiredArgumentBuilder(name, type);
    };
    RequiredArgumentBuilder.prototype.suggests = function (provider) {
        this.suggestionsProvider = provider;
        return this.getThis();
    };
    RequiredArgumentBuilder.prototype.getSuggestionsProvider = function () {
        return this.suggestionsProvider;
    };
    RequiredArgumentBuilder.prototype.getThis = function () {
        return this;
    };
    RequiredArgumentBuilder.prototype.getType = function () {
        return this.type;
    };
    RequiredArgumentBuilder.prototype.getName = function () {
        return this.name;
    };
    RequiredArgumentBuilder.prototype.build = function () {
        var e_1, _a;
        var result = new ArgumentCommandNode_1.default(this.getName(), this.getType(), this.getCommand(), this.getRequirement(), this.getRedirect(), this.getRedirectModifier(), this.isFork(), this.getSuggestionsProvider());
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
    return RequiredArgumentBuilder;
}(ArgumentBuilder_1.default));
exports.default = RequiredArgumentBuilder;
exports.argument = RequiredArgumentBuilder.argument;
//# sourceMappingURL=RequiredArgumentBuilder.js.map