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
var CommandNode_1 = require("./CommandNode");
var StringReader_1 = require("../StringReader");
var LiteralArgumentBuilder_1 = require("../builder/LiteralArgumentBuilder");
var StringRange_1 = require("../context/StringRange");
var CommandSyntaxException_1 = require("../exceptions/CommandSyntaxException");
var Suggestions_1 = require("../suggestion/Suggestions");
var LiteralCommandNode = /** @class */ (function (_super) {
    __extends(LiteralCommandNode, _super);
    function LiteralCommandNode(literal, command, requirement, redirect, modifier, forks) {
        var _this = _super.call(this, command, requirement, redirect, modifier, forks) || this;
        _this.literal = literal;
        return _this;
    }
    LiteralCommandNode.prototype.getNodeType = function () {
        return "literal";
    };
    LiteralCommandNode.prototype.getLiteral = function () {
        return this.literal;
    };
    LiteralCommandNode.prototype.getName = function () {
        return this.literal;
    };
    LiteralCommandNode.prototype.parse = function (reader, contextBuilder) {
        var start = reader.getCursor();
        var end = this.__parse(reader);
        if (end > -1) {
            contextBuilder.withNode(this, StringRange_1.default.between(start, end));
            return;
        }
        throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.literalIncorrect().createWithContext(reader, this.literal);
    };
    LiteralCommandNode.prototype.__parse = function (reader) {
        var start = reader.getCursor();
        if (reader.canRead(this.literal.length)) {
            var end = start + this.literal.length;
            if (reader.getString().substring(start, end) === this.literal) {
                reader.setCursor(end);
                if (!reader.canRead() || reader.peek() == ' ') {
                    return end;
                }
                else {
                    reader.setCursor(start);
                }
            }
        }
        return -1;
    };
    LiteralCommandNode.prototype.listSuggestions = function (context, builder) {
        if (this.literal.toLowerCase().startsWith(builder.getRemaining().toLowerCase())) {
            return builder.suggest(this.literal).buildPromise();
        }
        else {
            return Suggestions_1.default.empty();
        }
    };
    LiteralCommandNode.prototype.isValidInput = function (input) {
        return this.__parse(new StringReader_1.default(input)) > -1;
    };
    LiteralCommandNode.prototype.equals = function (o) {
        if (this === o)
            return true;
        if (!(o instanceof LiteralCommandNode))
            return false;
        if (!(this.literal === o.literal))
            return false;
        return _super.prototype.equals.call(this, o);
    };
    LiteralCommandNode.prototype.getUsageText = function () {
        return this.literal;
    };
    LiteralCommandNode.prototype.createBuilder = function () {
        var builder = LiteralArgumentBuilder_1.default.literal(this.literal);
        builder.requires(this.getRequirement());
        builder.forward(this.getRedirect(), this.getRedirectModifier(), this.isFork());
        if (this.getCommand() != null)
            builder.executes(this.getCommand());
        return builder;
    };
    LiteralCommandNode.prototype.getSortedKey = function () {
        return this.literal;
    };
    LiteralCommandNode.prototype.getExamples = function () {
        return [this.literal];
    };
    LiteralCommandNode.prototype.toString = function () {
        return "<literal " + this.literal + ">";
    };
    return LiteralCommandNode;
}(CommandNode_1.default));
exports.default = LiteralCommandNode;
//# sourceMappingURL=LiteralCommandNode.js.map