"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringRange = /** @class */ (function () {
    function StringRange(start, end) {
        this.start = start;
        this.end = end;
    }
    StringRange.at = function (pos) {
        return new StringRange(pos, pos);
    };
    StringRange.between = function (start, end) {
        return new StringRange(start, end);
    };
    StringRange.encompassing = function (a, b) {
        return new StringRange(Math.min(a.getStart(), b.getStart()), Math.max(a.getEnd(), b.getEnd()));
    };
    StringRange.prototype.getStart = function () {
        return this.start;
    };
    StringRange.prototype.getEnd = function () {
        return this.end;
    };
    StringRange.prototype.get = function (str) {
        if (typeof str === "string")
            return str.substring(this.start, this.end);
        else
            return str.getString().substring(this.start, this.end);
    };
    StringRange.prototype.isEmpty = function () {
        return this.start === this.end;
    };
    StringRange.prototype.getLength = function () {
        return this.end - this.start;
    };
    StringRange.prototype.equals = function (o) {
        if (this === o)
            return true;
        if (!(o instanceof StringRange))
            return false;
        return this.start === o.start && this.end == o.end;
    };
    StringRange.prototype.toString = function () {
        return "StringRange{" + "start=" + this.start + ", end=" + this.end + '}';
    };
    return StringRange;
}());
exports.default = StringRange;
//# sourceMappingURL=StringRange.js.map