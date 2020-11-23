"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
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
var StringRange_1 = require("./StringRange");
var CommandContext_1 = require("./CommandContext");
var SuggestionContext_1 = require("./SuggestionContext");
var ParsedCommandNode_1 = require("./ParsedCommandNode");
var CommandContextBuilder = /** @class */ (function () {
    function CommandContextBuilder(dispatcher, source, rootNode, start) {
        this.args = new Map();
        this.nodes = [];
        this.modifier = null;
        this.rootNode = rootNode;
        this.dispatcher = dispatcher;
        this.source = source;
        this.range = StringRange_1.default.at(start);
    }
    CommandContextBuilder.prototype.withSource = function (source) {
        this.source = source;
        return this;
    };
    CommandContextBuilder.prototype.getSource = function () {
        return this.source;
    };
    CommandContextBuilder.prototype.getRootNode = function () {
        return this.rootNode;
    };
    CommandContextBuilder.prototype.withArgument = function (name, argument) {
        this.args.set(name, argument);
        return this;
    };
    CommandContextBuilder.prototype.getArguments = function () {
        return this.args;
    };
    CommandContextBuilder.prototype.withCommand = function (command) {
        this.command = command;
        return this;
    };
    CommandContextBuilder.prototype.withNode = function (node, range) {
        this.nodes.push(new ParsedCommandNode_1.default(node, range));
        this.range = StringRange_1.default.encompassing(this.range, range);
        this.modifier = node.getRedirectModifier();
        this.forks = node.isFork();
        return this;
    };
    CommandContextBuilder.prototype.copy = function () {
        var _a;
        var copy = new CommandContextBuilder(this.dispatcher, this.source, this.rootNode, this.range.getStart());
        copy.command = this.command;
        copy.args = new Map(__spread(copy.args, this.args));
        (_a = copy.nodes).push.apply(_a, __spread(this.nodes));
        copy.child = this.child;
        copy.range = this.range;
        copy.forks = this.forks;
        return copy;
    };
    CommandContextBuilder.prototype.withChild = function (child) {
        this.child = child;
        return this;
    };
    CommandContextBuilder.prototype.getChild = function () {
        return this.child;
    };
    CommandContextBuilder.prototype.getLastChild = function () {
        var result = this;
        while (result.getChild() != null) {
            result = result.getChild();
        }
        return result;
    };
    CommandContextBuilder.prototype.getCommand = function () {
        return this.command;
    };
    CommandContextBuilder.prototype.getNodes = function () {
        return this.nodes;
    };
    CommandContextBuilder.prototype.build = function (input) {
        return new CommandContext_1.default(this.source, input, this.args, this.command, this.rootNode, this.nodes, this.range, this.child == null ? null : this.child.build(input), this.modifier, this.forks);
    };
    CommandContextBuilder.prototype.getDispatcher = function () {
        return this.dispatcher;
    };
    CommandContextBuilder.prototype.getRange = function () {
        return this.range;
    };
    CommandContextBuilder.prototype.findSuggestionContext = function (cursor) {
        var e_1, _a;
        if ((this.range.getStart() <= cursor)) {
            if ((this.range.getEnd() < cursor)) {
                if ((this.child != null)) {
                    return this.child.findSuggestionContext(cursor);
                }
                else if (this.nodes.length > 0) {
                    var last = this.nodes[this.nodes.length - 1];
                    return new SuggestionContext_1.default(last.getNode(), last.getRange().getEnd() + 1);
                }
                else {
                    return new SuggestionContext_1.default(this.rootNode, this.range.getStart());
                }
            }
            else {
                var prev = this.rootNode;
                try {
                    for (var _b = __values(this.nodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var node = _c.value;
                        var nodeRange = node.getRange();
                        if (nodeRange.getStart() <= cursor && cursor <= nodeRange.getEnd()) {
                            return new SuggestionContext_1.default(prev, nodeRange.getStart());
                        }
                        prev = node.getNode();
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                if ((prev == null)) {
                    throw new Error("Can't find node before cursor");
                }
                return new SuggestionContext_1.default(prev, this.range.getStart());
            }
        }
        throw new Error("Can't find node before cursor");
    };
    return CommandContextBuilder;
}());
exports.default = CommandContextBuilder;
//# sourceMappingURL=CommandContextBuilder.js.map