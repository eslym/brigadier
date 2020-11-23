"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ParsedCommandNode = /** @class */ (function () {
    function ParsedCommandNode(node, range) {
        this.node = node;
        this.range = range;
    }
    ParsedCommandNode.prototype.getNode = function () {
        return this.node;
    };
    ParsedCommandNode.prototype.getRange = function () {
        return this.range;
    };
    ParsedCommandNode.prototype.toString = function () {
        return this.node + "@" + this.range;
    };
    ParsedCommandNode.prototype.equals = function (o) {
        if (this === o)
            return true;
        if (o == null || !(o instanceof ParsedCommandNode)) {
            return false;
        }
        return this.node.equals(o.node) && this.range.equals(o.range);
    };
    return ParsedCommandNode;
}());
exports.default = ParsedCommandNode;
//# sourceMappingURL=ParsedCommandNode.js.map