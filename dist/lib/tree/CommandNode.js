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
var isEqual_1 = require("../util/isEqual");
var CommandNode = /** @class */ (function () {
    function CommandNode(command, requirement, redirect, modifier, forks) {
        var _this = this;
        this.children = new Map();
        this.literals = new Map();
        this.args = new Map();
        this.command = command;
        this.requirement = requirement || (function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/, true];
        }); }); });
        this.redirect = redirect;
        this.modifier = modifier;
        this.forks = forks;
    }
    CommandNode.prototype.getCommand = function () {
        return this.command;
    };
    CommandNode.prototype.getChildren = function () {
        return this.children.values();
    };
    CommandNode.prototype.getChildrenCount = function () {
        return this.children.size;
    };
    CommandNode.prototype.getChild = function (name) {
        return this.children.get(name);
    };
    CommandNode.prototype.getRedirect = function () {
        return this.redirect;
    };
    CommandNode.prototype.getRedirectModifier = function () {
        return this.modifier;
    };
    CommandNode.prototype.canUse = function (source) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.requirement(source)];
            });
        });
    };
    CommandNode.prototype.addChild = function (node) {
        var e_1, _a;
        if (node.getNodeType() === "root") {
            throw new Error("Cannot add a RootCommandNode as a child to any other CommandNode");
        }
        var child = this.children.get(node.getName());
        if (child != null) {
            //  We've found something to merge onto
            if ((node.getCommand() != null)) {
                child.command = node.getCommand();
            }
            try {
                for (var _b = __values(node.getChildren()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var grandchild = _c.value;
                    child.addChild(grandchild);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            this.children.set(node.getName(), node);
            if (node.getNodeType() === "literal") {
                this.literals.set(node.getName(), node);
            }
            else if (node.getNodeType() === "argument") {
                this.args.set(node.getName(), node);
            }
        }
        this.children = new Map(__spread(this.children.entries()).sort(function (a, b) { return a[1].compareTo(b[1]); }));
    };
    CommandNode.prototype.findAmbiguities = function (consumer) {
        var e_2, _a, e_3, _b, e_4, _c;
        var matches = [];
        try {
            for (var _d = __values(this.children.values()), _e = _d.next(); !_e.done; _e = _d.next()) {
                var child = _e.value;
                try {
                    for (var _f = (e_3 = void 0, __values(this.children.values())), _g = _f.next(); !_g.done; _g = _f.next()) {
                        var sibling = _g.value;
                        if (child === sibling) {
                            continue;
                        }
                        try {
                            for (var _h = (e_4 = void 0, __values(child.getExamples())), _j = _h.next(); !_j.done; _j = _h.next()) {
                                var input = _j.value;
                                if (sibling.isValidInput(input)) {
                                    matches.push(input);
                                }
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        if (matches.length > 0) {
                            consumer.ambiguous(this, child, sibling, matches);
                            matches = [];
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                child.findAmbiguities(consumer);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    CommandNode.prototype.equals = function (o) {
        if (this === o)
            return true;
        if (!(o instanceof CommandNode))
            return false;
        if (this.children.size !== o.children.size) {
            return false;
        }
        if (!isEqual_1.default(this.children, o.children))
            return false;
        return !(this.command != null ? !isEqual_1.default(this.command, o.command) : o.command != null);
    };
    CommandNode.prototype.getRequirement = function () {
        return this.requirement;
    };
    CommandNode.prototype.getRelevantNodes = function (input) {
        if (this.literals.size > 0) {
            var cursor = input.getCursor();
            while ((input.canRead()
                && (input.peek() != ' '))) {
                input.skip();
            }
            var text = input.getString().substring(cursor, input.getCursor());
            input.setCursor(cursor);
            var literal = this.literals.get(text);
            if (literal != null) {
                return [literal];
            }
            else {
                return this.args.values();
            }
        }
        else {
            return this.args.values();
        }
    };
    CommandNode.prototype.compareTo = function (o) {
        if (this.getNodeType() === o.getNodeType()) {
            return this.getSortedKey() > o.getSortedKey() ? 1 : -1;
        }
        return (o.getNodeType() === "literal") ? 1 : -1;
    };
    CommandNode.prototype.isFork = function () {
        return this.forks;
    };
    return CommandNode;
}());
exports.default = CommandNode;
//# sourceMappingURL=CommandNode.js.map