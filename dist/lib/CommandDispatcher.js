"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
Object.defineProperty(exports, "__esModule", { value: true });
var ParseResults_1 = require("./ParseResults");
var CommandContextBuilder_1 = require("./context/CommandContextBuilder");
var CommandSyntaxException_1 = require("./exceptions/CommandSyntaxException");
var Suggestions_1 = require("./suggestion/Suggestions");
var SuggestionsBuilder_1 = require("./suggestion/SuggestionsBuilder");
var RootCommandNode_1 = require("./tree/RootCommandNode");
var StringReader_1 = require("./StringReader");
var ARGUMENT_SEPARATOR = " ";
var USAGE_OPTIONAL_OPEN = "[";
var USAGE_OPTIONAL_CLOSE = "]";
var USAGE_REQUIRED_OPEN = "(";
var USAGE_REQUIRED_CLOSE = ")";
var USAGE_OR = "|";
var CommandDispatcher = /** @class */ (function () {
    function CommandDispatcher(root) {
        if (root === void 0) { root = null; }
        this.consumer = {
            onCommandComplete: function () { }
        };
        this.root = root || new RootCommandNode_1.default();
    }
    CommandDispatcher.prototype.register = function (command) {
        var build = command.build();
        this.root.addChild(build);
        return build;
    };
    CommandDispatcher.prototype.setConsumer = function (consumer) {
        this.consumer = consumer;
    };
    CommandDispatcher.prototype.execute = function (input, source) {
        if (source === void 0) { source = null; }
        return __awaiter(this, void 0, void 0, function () {
            var parse, result, successfulForks, forked, foundCommand, command, original, contexts, next, i, context_1, child, modifier, results, results_1, results_1_1, source_1, value, ex_1;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof input === "string")
                            input = new StringReader_1.default(input);
                        if (!(input instanceof StringReader_1.default)) return [3 /*break*/, 3];
                        if (!!(source == null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.parse(input, source)];
                    case 1:
                        parse = _b.sent();
                        _b.label = 2;
                    case 2: return [3 /*break*/, 4];
                    case 3:
                        parse = input;
                        _b.label = 4;
                    case 4:
                        if (parse.getReader().canRead()) {
                            if (parse.getExceptions().size === 1) {
                                throw parse.getExceptions().values().next().value;
                            }
                            else if (parse.getContext().getRange().isEmpty()) {
                                throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.dispatcherUnknownCommand().createWithContext(parse.getReader());
                            }
                            else {
                                throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.dispatcherUnknownArgument().createWithContext(parse.getReader());
                            }
                        }
                        result = 0;
                        successfulForks = 0;
                        forked = false;
                        foundCommand = false;
                        command = parse.getReader().getString();
                        original = parse.getContext().build(command);
                        contexts = [];
                        contexts.push(original);
                        next = null;
                        _b.label = 5;
                    case 5:
                        if (!!(contexts == null)) return [3 /*break*/, 13];
                        i = 0;
                        _b.label = 6;
                    case 6:
                        if (!(i < contexts.length)) return [3 /*break*/, 12];
                        context_1 = contexts[i];
                        child = context_1.getChild();
                        if (!!(child == null)) return [3 /*break*/, 7];
                        forked = forked || context_1.isForked();
                        if (child.hasNodes()) {
                            foundCommand = true;
                            modifier = context_1.getRedirectModifier();
                            if (modifier == null) {
                                if (next == null)
                                    next = [];
                                next.push(child.copyFor(context_1.getSource()));
                            }
                            else {
                                try {
                                    results = modifier.apply(context_1);
                                    if (results.length !== 0) {
                                        if (next == null)
                                            next = [];
                                        try {
                                            for (results_1 = (e_1 = void 0, __values(results)), results_1_1 = results_1.next(); !results_1_1.done; results_1_1 = results_1.next()) {
                                                source_1 = results_1_1.value;
                                                next.push(child.copyFor(source_1));
                                            }
                                        }
                                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                                        finally {
                                            try {
                                                if (results_1_1 && !results_1_1.done && (_a = results_1.return)) _a.call(results_1);
                                            }
                                            finally { if (e_1) throw e_1.error; }
                                        }
                                    }
                                }
                                catch (ex) {
                                    this.consumer.onCommandComplete(context_1, false, 0);
                                    if (!forked)
                                        throw ex;
                                }
                            }
                        }
                        return [3 /*break*/, 11];
                    case 7:
                        if (!(context_1.getCommand() != null)) return [3 /*break*/, 11];
                        foundCommand = true;
                        _b.label = 8;
                    case 8:
                        _b.trys.push([8, 10, , 11]);
                        return [4 /*yield*/, context_1.getCommand()(context_1)];
                    case 9:
                        value = _b.sent();
                        result += value;
                        this.consumer.onCommandComplete(context_1, true, value);
                        successfulForks++;
                        return [3 /*break*/, 11];
                    case 10:
                        ex_1 = _b.sent();
                        this.consumer.onCommandComplete(context_1, false, 0);
                        if (!forked)
                            throw ex_1;
                        return [3 /*break*/, 11];
                    case 11:
                        i++;
                        return [3 /*break*/, 6];
                    case 12:
                        contexts = next;
                        next = null;
                        return [3 /*break*/, 5];
                    case 13:
                        if (!foundCommand) {
                            this.consumer.onCommandComplete(original, false, 0);
                            throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.dispatcherUnknownCommand().createWithContext(parse.getReader());
                        }
                        return [2 /*return*/, forked ? successfulForks : result];
                }
            });
        });
    };
    CommandDispatcher.prototype.parse = function (command, source) {
        if (typeof command === "string")
            command = new StringReader_1.default(command);
        var context = new CommandContextBuilder_1.default(this, source, this.root, command.getCursor());
        return this.parseNodes(this.root, command, context);
    };
    CommandDispatcher.prototype.parseNodes = function (node, originalReader, contextSoFar) {
        return __awaiter(this, void 0, void 0, function () {
            var source, errors, potentials, cursor, _a, _b, child, context_2, reader, childContext, parse, parse, e_2_1;
            var e_2, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        source = contextSoFar.getSource();
                        errors = null;
                        potentials = null;
                        cursor = originalReader.getCursor();
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 11, 12, 13]);
                        _a = __values(node.getRelevantNodes(originalReader)), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 10];
                        child = _b.value;
                        return [4 /*yield*/, child.canUse(source)];
                    case 3:
                        if (!(_d.sent()))
                            return [3 /*break*/, 9];
                        context_2 = contextSoFar.copy();
                        reader = new StringReader_1.default(originalReader);
                        try {
                            child.parse(reader, context_2);
                            if (reader.canRead())
                                if (reader.peek() != ARGUMENT_SEPARATOR)
                                    throw CommandSyntaxException_1.default.BUILT_IN_EXCEPTIONS.dispatcherExpectedArgumentSeparator().createWithContext(reader);
                        }
                        catch (ex) {
                            if (errors == null) {
                                errors = new Map();
                            }
                            errors.set(child, ex);
                            reader.setCursor(cursor);
                            return [3 /*break*/, 9];
                        }
                        context_2.withCommand(child.getCommand());
                        if (!reader.canRead(child.getRedirect() == null ? 2 : 1)) return [3 /*break*/, 8];
                        reader.skip();
                        if (!!(child.getRedirect() == null)) return [3 /*break*/, 5];
                        childContext = new CommandContextBuilder_1.default(this, source, child.getRedirect(), reader.getCursor());
                        return [4 /*yield*/, this.parseNodes(child.getRedirect(), reader, childContext)];
                    case 4:
                        parse = _d.sent();
                        context_2.withChild(parse.getContext());
                        return [2 /*return*/, new ParseResults_1.default(context_2, parse.getReader(), parse.getExceptions())];
                    case 5: return [4 /*yield*/, this.parseNodes(child, reader, context_2)];
                    case 6:
                        parse = _d.sent();
                        if (potentials == null) {
                            potentials = [];
                        }
                        potentials.push(parse);
                        _d.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        if (potentials == null) {
                            potentials = [];
                        }
                        potentials.push(new ParseResults_1.default(context_2, reader, new Map()));
                        _d.label = 9;
                    case 9:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 10: return [3 /*break*/, 13];
                    case 11:
                        e_2_1 = _d.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 13];
                    case 12:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 13:
                        if (!(potentials == null)) {
                            if (potentials.length > 1) {
                                potentials.sort(function (a, b) {
                                    if (!a.getReader().canRead() && b.getReader().canRead()) {
                                        return -1;
                                    }
                                    if (a.getReader().canRead() && !b.getReader().canRead()) {
                                        return 1;
                                    }
                                    if (a.getExceptions().size === 0 && b.getExceptions().size !== 0) {
                                        return -1;
                                    }
                                    if (a.getExceptions().size !== 0 && b.getExceptions().size === 0) {
                                        return 1;
                                    }
                                    return 0;
                                });
                            }
                            return [2 /*return*/, potentials[0]];
                        }
                        return [2 /*return*/, new ParseResults_1.default(contextSoFar, originalReader, errors == null ? new Map() : errors)];
                }
            });
        });
    };
    CommandDispatcher.prototype.getAllUsage = function (node, source, restricted) {
        var result = [];
        this.__getAllUsage(node, source, result, "", restricted);
        return result;
    };
    CommandDispatcher.prototype.__getAllUsage = function (node, source, result, prefix, restricted) {
        var e_3, _a;
        if (prefix === void 0) { prefix = ""; }
        if (restricted && !node.canUse(source)) {
            return;
        }
        if (node.getCommand() != null) {
            result.push(prefix);
        }
        if (node.getRedirect() != null) {
            var redirect = node.getRedirect() === this.root ? "..." : "-> " + node.getRedirect().getUsageText();
            result.push(prefix.length === 0 ? node.getUsageText() + ARGUMENT_SEPARATOR + redirect : prefix + ARGUMENT_SEPARATOR + redirect);
        }
        else if (node.getChildrenCount() > 0) {
            try {
                for (var _b = __values(node.getChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    this.__getAllUsage(child, source, result, prefix.length === 0 ? child.getUsageText() : prefix + ARGUMENT_SEPARATOR + child.getUsageText(), restricted);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    };
    CommandDispatcher.prototype.getSmartUsage = function (node, source) {
        return __awaiter(this, void 0, void 0, function () {
            var result, optional, _a, _b, child, usage, _c, _d, _e, e_4_1;
            var e_4, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        result = new Map();
                        optional = node.getCommand() !== null;
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 6, 7, 8]);
                        _a = __values(node.getChildren()), _b = _a.next();
                        _g.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        child = _b.value;
                        usage = this.__getSmartUsage(child, source, optional, false);
                        if (!!(usage == null)) return [3 /*break*/, 4];
                        _d = (_c = result).set;
                        _e = [child];
                        return [4 /*yield*/, usage];
                    case 3:
                        _d.apply(_c, _e.concat([_g.sent()]));
                        _g.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_4_1 = _g.sent();
                        e_4 = { error: e_4_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                        }
                        finally { if (e_4) throw e_4.error; }
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/, result];
                }
            });
        });
    };
    CommandDispatcher.prototype.__getSmartUsage = function (node, source, optional, deep) {
        return __awaiter(this, void 0, void 0, function () {
            var self, childOptional, open, close, redirect, children, _a, _b, child, e_5_1, usage, childUsage, children_1, children_1_1, child, usage, _c, _d, e_6_1, usage, builder, count, children_2, children_2_1, child;
            var e_5, _e, e_6, _f, e_7, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, node.canUse(source)];
                    case 1:
                        if (!(_h.sent())) {
                            return [2 /*return*/, null];
                        }
                        self = optional ? USAGE_OPTIONAL_OPEN + node.getUsageText() + USAGE_OPTIONAL_CLOSE : node.getUsageText();
                        childOptional = node.getCommand() != null;
                        open = childOptional ? USAGE_OPTIONAL_OPEN : USAGE_REQUIRED_OPEN;
                        close = childOptional ? USAGE_OPTIONAL_CLOSE : USAGE_REQUIRED_CLOSE;
                        if (!!deep) return [3 /*break*/, 20];
                        if (!(node.getRedirect() != null)) return [3 /*break*/, 2];
                        redirect = node.getRedirect() == this.root ? "..." : "-> " + node.getRedirect().getUsageText();
                        return [2 /*return*/, self + ARGUMENT_SEPARATOR + redirect];
                    case 2:
                        children = [];
                        _h.label = 3;
                    case 3:
                        _h.trys.push([3, 8, 9, 10]);
                        _a = __values(node.getChildren()), _b = _a.next();
                        _h.label = 4;
                    case 4:
                        if (!!_b.done) return [3 /*break*/, 7];
                        child = _b.value;
                        return [4 /*yield*/, child.canUse(source)];
                    case 5:
                        if (_h.sent()) {
                            children.push(child);
                        }
                        _h.label = 6;
                    case 6:
                        _b = _a.next();
                        return [3 /*break*/, 4];
                    case 7: return [3 /*break*/, 10];
                    case 8:
                        e_5_1 = _h.sent();
                        e_5 = { error: e_5_1 };
                        return [3 /*break*/, 10];
                    case 9:
                        try {
                            if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                        }
                        finally { if (e_5) throw e_5.error; }
                        return [7 /*endfinally*/];
                    case 10:
                        if (!(children.length == 1)) return [3 /*break*/, 11];
                        usage = this.__getSmartUsage(children[0], source, childOptional, childOptional);
                        if (!(usage == null)) {
                            return [2 /*return*/, self + ARGUMENT_SEPARATOR + usage];
                        }
                        return [3 /*break*/, 20];
                    case 11:
                        if (!(children.length > 1)) return [3 /*break*/, 20];
                        childUsage = new Set();
                        _h.label = 12;
                    case 12:
                        _h.trys.push([12, 17, 18, 19]);
                        children_1 = __values(children), children_1_1 = children_1.next();
                        _h.label = 13;
                    case 13:
                        if (!!children_1_1.done) return [3 /*break*/, 16];
                        child = children_1_1.value;
                        usage = this.__getSmartUsage(child, source, childOptional, true);
                        if (!!(usage == null)) return [3 /*break*/, 15];
                        _d = (_c = childUsage).add;
                        return [4 /*yield*/, usage];
                    case 14:
                        _d.apply(_c, [_h.sent()]);
                        _h.label = 15;
                    case 15:
                        children_1_1 = children_1.next();
                        return [3 /*break*/, 13];
                    case 16: return [3 /*break*/, 19];
                    case 17:
                        e_6_1 = _h.sent();
                        e_6 = { error: e_6_1 };
                        return [3 /*break*/, 19];
                    case 18:
                        try {
                            if (children_1_1 && !children_1_1.done && (_f = children_1.return)) _f.call(children_1);
                        }
                        finally { if (e_6) throw e_6.error; }
                        return [7 /*endfinally*/];
                    case 19:
                        if (childUsage.size === 1) {
                            usage = childUsage.values().next().value;
                            return [2 /*return*/, self + ARGUMENT_SEPARATOR + (childOptional ? USAGE_OPTIONAL_OPEN + usage + USAGE_OPTIONAL_CLOSE : usage)];
                        }
                        else if (childUsage.size > 1) {
                            builder = open;
                            count = 0;
                            try {
                                for (children_2 = __values(children), children_2_1 = children_2.next(); !children_2_1.done; children_2_1 = children_2.next()) {
                                    child = children_2_1.value;
                                    if (count > 0) {
                                        builder += USAGE_OR;
                                    }
                                    builder += child.getUsageText();
                                    count++;
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (children_2_1 && !children_2_1.done && (_g = children_2.return)) _g.call(children_2);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                            if (count > 0) {
                                builder += close;
                                return [2 /*return*/, self + ARGUMENT_SEPARATOR + builder];
                            }
                        }
                        _h.label = 20;
                    case 20: return [2 /*return*/, self];
                }
            });
        });
    };
    CommandDispatcher.prototype.getCompletionSuggestions = function (parse, cursor) {
        if (cursor === void 0) { cursor = parse.getReader().getTotalLength(); }
        return __awaiter(this, void 0, void 0, function () {
            var context, nodeBeforeCursor, parent, start, fullInput, truncatedInput, futures, _a, _b, node, future, ignored_1, e_8_1;
            var e_8, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        context = parse.getContext();
                        nodeBeforeCursor = context.findSuggestionContext(cursor);
                        parent = nodeBeforeCursor.parent;
                        start = Math.min(nodeBeforeCursor.startPos, cursor);
                        fullInput = parse.getReader().getString();
                        truncatedInput = fullInput.substring(0, cursor);
                        futures = [];
                        _d.label = 1;
                    case 1:
                        _d.trys.push([1, 10, 11, 12]);
                        _a = __values(parent.getChildren()), _b = _a.next();
                        _d.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 9];
                        node = _b.value;
                        return [4 /*yield*/, Suggestions_1.default.empty()];
                    case 3:
                        future = _d.sent();
                        _d.label = 4;
                    case 4:
                        _d.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, node.listSuggestions(context.build(truncatedInput), new SuggestionsBuilder_1.default(truncatedInput, start))];
                    case 5:
                        future = _d.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        ignored_1 = _d.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        futures.push(future);
                        _d.label = 8;
                    case 8:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 9: return [3 /*break*/, 12];
                    case 10:
                        e_8_1 = _d.sent();
                        e_8 = { error: e_8_1 };
                        return [3 /*break*/, 12];
                    case 11:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_8) throw e_8.error; }
                        return [7 /*endfinally*/];
                    case 12: return [2 /*return*/, Promise.resolve(Suggestions_1.default.merge(fullInput, futures))];
                }
            });
        });
    };
    CommandDispatcher.prototype.getRoot = function () {
        return this.root;
    };
    CommandDispatcher.prototype.getPath = function (target) {
        var e_9, _a, e_10, _b;
        var nodes = [];
        this.addPaths(this.root, nodes, []);
        try {
            for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                var list = nodes_1_1.value;
                if (list[list.length - 1] === target) {
                    var result = [];
                    try {
                        for (var list_1 = (e_10 = void 0, __values(list)), list_1_1 = list_1.next(); !list_1_1.done; list_1_1 = list_1.next()) {
                            var node = list_1_1.value;
                            if (node !== this.root) {
                                result.push(node.getName());
                            }
                        }
                    }
                    catch (e_10_1) { e_10 = { error: e_10_1 }; }
                    finally {
                        try {
                            if (list_1_1 && !list_1_1.done && (_b = list_1.return)) _b.call(list_1);
                        }
                        finally { if (e_10) throw e_10.error; }
                    }
                    return result;
                }
            }
        }
        catch (e_9_1) { e_9 = { error: e_9_1 }; }
        finally {
            try {
                if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
            }
            finally { if (e_9) throw e_9.error; }
        }
        return [];
    };
    CommandDispatcher.prototype.findNode = function (path) {
        var e_11, _a;
        var node = this.root;
        try {
            for (var path_1 = __values(path), path_1_1 = path_1.next(); !path_1_1.done; path_1_1 = path_1.next()) {
                var name_1 = path_1_1.value;
                node = node.getChild(name_1);
                if (node == null)
                    return null;
            }
        }
        catch (e_11_1) { e_11 = { error: e_11_1 }; }
        finally {
            try {
                if (path_1_1 && !path_1_1.done && (_a = path_1.return)) _a.call(path_1);
            }
            finally { if (e_11) throw e_11.error; }
        }
        return node;
    };
    CommandDispatcher.prototype.findAmbiguities = function (consumer) {
        this.root.findAmbiguities(consumer);
    };
    CommandDispatcher.prototype.addPaths = function (node, result, parents) {
        var e_12, _a;
        var current = [];
        current.push.apply(current, __spread(parents));
        current.push(node);
        result.push(current);
        try {
            for (var _b = __values(node.getChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var child = _c.value;
                this.addPaths(child, result, current);
            }
        }
        catch (e_12_1) { e_12 = { error: e_12_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_12) throw e_12.error; }
        }
    };
    return CommandDispatcher;
}());
exports.default = CommandDispatcher;
//# sourceMappingURL=CommandDispatcher.js.map