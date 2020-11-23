"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandNode_1 = require("../tree/CommandNode");
var RootCommandNode_1 = require("../tree/RootCommandNode");
var ArgumentBuilder = /** @class */ (function () {
    function ArgumentBuilder() {
        this.args = new RootCommandNode_1.default();
        this.modifier = null;
    }
    ArgumentBuilder.prototype.then = function (arg) {
        if (!(this.target == null)) {
            throw new Error("Cannot add children to a redirected node");
        }
        if (arg instanceof CommandNode_1.default)
            this.args.addChild(arg);
        else
            this.args.addChild(arg.build());
        return this.getThis();
    };
    ArgumentBuilder.prototype.getArguments = function () {
        return this.args.getChildren();
    };
    ArgumentBuilder.prototype.executes = function (command) {
        this.command = command;
        return this.getThis();
    };
    ArgumentBuilder.prototype.getCommand = function () {
        return this.command;
    };
    ArgumentBuilder.prototype.requires = function (requirement) {
        this.requirement = requirement;
        return this.getThis();
    };
    ArgumentBuilder.prototype.getRequirement = function () {
        return this.requirement;
    };
    ArgumentBuilder.prototype.redirect = function (target, modifier) {
        return this.forward(target, modifier == null ? null : function (o) { return [modifier.apply(o)]; }, false);
    };
    ArgumentBuilder.prototype.fork = function (target, modifier) {
        return this.forward(target, modifier, true);
    };
    ArgumentBuilder.prototype.forward = function (target, modifier, fork) {
        if (this.args.getChildrenCount() > 0) {
            throw new Error("Cannot forward a node with children");
        }
        this.target = target;
        this.modifier = modifier;
        this.forks = fork;
        return this.getThis();
    };
    ArgumentBuilder.prototype.getRedirect = function () {
        return this.target;
    };
    ArgumentBuilder.prototype.getRedirectModifier = function () {
        return this.modifier;
    };
    ArgumentBuilder.prototype.isFork = function () {
        return this.forks;
    };
    return ArgumentBuilder;
}());
exports.default = ArgumentBuilder;
//# sourceMappingURL=ArgumentBuilder.js.map