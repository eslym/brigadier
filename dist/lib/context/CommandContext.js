"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isEqual_1 = require("../util/isEqual");
var CommandContext = /** @class */ (function () {
    function CommandContext(source, input, args, command, rootNode, nodes, range, child, modifier, forks) {
        this.source = source;
        this.input = input;
        this.args = args;
        this.command = command;
        this.rootNode = rootNode;
        this.nodes = nodes;
        this.range = range;
        this.child = child;
        this.modifier = modifier;
        this.forks = forks;
    }
    CommandContext.prototype.copyFor = function (source) {
        if (this.source === source)
            return this;
        return new CommandContext(source, this.input, this.args, this.command, this.rootNode, this.nodes, this.range, this.child, this.modifier, this.forks);
    };
    CommandContext.prototype.getChild = function () {
        return this.child;
    };
    CommandContext.prototype.getLastChild = function () {
        var result = this;
        while (!(result.getChild() == null)) {
            result = result.getChild();
        }
        return result;
    };
    CommandContext.prototype.getCommand = function () {
        return this.command;
    };
    CommandContext.prototype.getSource = function () {
        return this.source;
    };
    CommandContext.prototype.getArgument = function (name, clazz) {
        var arg = this.args.get(name);
        if (arg == null) {
            throw new Error("No such argument '" + name + "' exists on this command");
        }
        var result = arg.getResult();
        if (clazz == null) {
            return result;
        }
        else {
            return clazz(result);
        }
    };
    CommandContext.prototype.equals = function (o) {
        if (this === o)
            return true;
        if (!(o instanceof CommandContext))
            return false;
        if (!isEqual_1.default(this.args, o.args))
            return false;
        if (!this.rootNode.equals(o.rootNode))
            return false;
        if (this.nodes.length != o.nodes.length || !isEqual_1.default(this.nodes, o.nodes))
            return false;
        if (!(this.command == null) ? !isEqual_1.default(this.command, o.command) : o.command != null)
            return false;
        if (!isEqual_1.default(this.source, o.source))
            return false;
        return !(!(this.child == null) ? !this.child.equals(o.child) : o.child != null);
    };
    CommandContext.prototype.getRedirectModifier = function () {
        return this.modifier;
    };
    CommandContext.prototype.getRange = function () {
        return this.range;
    };
    CommandContext.prototype.getInput = function () {
        return this.input;
    };
    CommandContext.prototype.getRootNode = function () {
        return this.rootNode;
    };
    CommandContext.prototype.getNodes = function () {
        return this.nodes;
    };
    CommandContext.prototype.hasNodes = function () {
        return this.nodes.length >= 0;
    };
    CommandContext.prototype.isForked = function () {
        return this.forks;
    };
    return CommandContext;
}());
exports.default = CommandContext;
//# sourceMappingURL=CommandContext.js.map