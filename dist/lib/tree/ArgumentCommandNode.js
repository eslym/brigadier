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
var isEqual_1 = require("../util/isEqual");
var StringReader_1 = require("../StringReader");
var RequiredArgumentBuilder_1 = require("../builder/RequiredArgumentBuilder");
var ParsedArgument_1 = require("../context/ParsedArgument");
var Suggestions_1 = require("../suggestion/Suggestions");
var CommandNode_1 = require("./CommandNode");
var USAGE_ARGUMENT_OPEN = "<";
var USAGE_ARGUMENT_CLOSE = ">";
var ArgumentCommandNode = /** @class */ (function (_super) {
    __extends(ArgumentCommandNode, _super);
    function ArgumentCommandNode(name, type, command, requirement, redirect, modifier, forks, customSuggestions) {
        var _this = _super.call(this, command, requirement, redirect, modifier, forks) || this;
        _this.name = name;
        _this.type = type;
        _this.customSuggestions = customSuggestions;
        return _this;
    }
    ArgumentCommandNode.prototype.getNodeType = function () {
        return "argument";
    };
    ArgumentCommandNode.prototype.getType = function () {
        return this.type;
    };
    ArgumentCommandNode.prototype.getName = function () {
        return this.name;
    };
    ArgumentCommandNode.prototype.getUsageText = function () {
        return USAGE_ARGUMENT_OPEN + this.name + USAGE_ARGUMENT_CLOSE;
    };
    ArgumentCommandNode.prototype.getCustomSuggestions = function () {
        return this.customSuggestions;
    };
    ArgumentCommandNode.prototype.parse = function (reader, contextBuilder) {
        var start = reader.getCursor();
        var result = this.type.parse(reader);
        var parsed = new ParsedArgument_1.default(start, reader.getCursor(), result);
        contextBuilder.withArgument(this.name, parsed);
        contextBuilder.withNode(this, parsed.getRange());
    };
    ArgumentCommandNode.prototype.listSuggestions = function (context, builder) {
        if (this.customSuggestions == null) {
            if (typeof this.type.listSuggestions === "function")
                return this.type.listSuggestions(context, builder);
            else
                return Suggestions_1.default.empty();
        }
        else {
            return this.customSuggestions.getSuggestions(context, builder);
        }
    };
    ArgumentCommandNode.prototype.createBuilder = function () {
        var builder = RequiredArgumentBuilder_1.default.argument(this.name, this.type);
        builder.requires(this.getRequirement());
        builder.forward(this.getRedirect(), this.getRedirectModifier(), this.isFork());
        builder.suggests(this.customSuggestions);
        if (this.getCommand() != null) {
            builder.executes(this.getCommand());
        }
        return builder;
    };
    ArgumentCommandNode.prototype.isValidInput = function (input) {
        try {
            var reader = new StringReader_1.default(input);
            this.type.parse(reader);
            return !reader.canRead() || reader.peek() == ' ';
        }
        catch (ignored) {
        }
        return false;
    };
    ArgumentCommandNode.prototype.equals = function (o) {
        if (this === o)
            return true;
        if (!(o instanceof ArgumentCommandNode))
            return false;
        if (!(this.name === o.name))
            return false;
        if (!isEqual_1.default(this.type, o.type))
            return false;
        return _super.prototype.equals.call(this, o);
    };
    ArgumentCommandNode.prototype.getSortedKey = function () {
        return this.name;
    };
    ArgumentCommandNode.prototype.getExamples = function () {
        return typeof this.type.getExamples === "function" ? this.type.getExamples() : [];
    };
    ArgumentCommandNode.prototype.toString = function () {
        return "<argument " + this.name + ":" + this.type + ">";
    };
    return ArgumentCommandNode;
}(CommandNode_1.default));
exports.default = ArgumentCommandNode;
//# sourceMappingURL=ArgumentCommandNode.js.map