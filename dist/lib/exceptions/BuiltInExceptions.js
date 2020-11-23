"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LiteralMessage_1 = require("../LiteralMessage");
var SimpleCommandExceptionType_1 = require("./SimpleCommandExceptionType");
var DynamicCommandExceptionType_1 = require("./DynamicCommandExceptionType");
var BuiltInExceptions = /** @class */ (function () {
    function BuiltInExceptions() {
    }
    BuiltInExceptions.prototype.floatTooLow = function () {
        return BuiltInExceptions.FLOAT_TOO_SMALL;
    };
    BuiltInExceptions.prototype.floatTooHigh = function () {
        return BuiltInExceptions.FLOAT_TOO_BIG;
    };
    BuiltInExceptions.prototype.integerTooLow = function () {
        return BuiltInExceptions.INTEGER_TOO_SMALL;
    };
    BuiltInExceptions.prototype.integerTooHigh = function () {
        return BuiltInExceptions.INTEGER_TOO_BIG;
    };
    BuiltInExceptions.prototype.literalIncorrect = function () {
        return BuiltInExceptions.LITERAL_INCORRECT;
    };
    BuiltInExceptions.prototype.readerExpectedStartOfQuote = function () {
        return BuiltInExceptions.READER_EXPECTED_START_OF_QUOTE;
    };
    BuiltInExceptions.prototype.readerExpectedEndOfQuote = function () {
        return BuiltInExceptions.READER_EXPECTED_END_OF_QUOTE;
    };
    BuiltInExceptions.prototype.readerInvalidEscape = function () {
        return BuiltInExceptions.READER_INVALID_ESCAPE;
    };
    BuiltInExceptions.prototype.readerInvalidBool = function () {
        return BuiltInExceptions.READER_INVALID_BOOL;
    };
    BuiltInExceptions.prototype.readerInvalidInt = function () {
        return BuiltInExceptions.READER_INVALID_INT;
    };
    BuiltInExceptions.prototype.readerExpectedInt = function () {
        return BuiltInExceptions.READER_EXPECTED_INT;
    };
    BuiltInExceptions.prototype.readerInvalidFloat = function () {
        return BuiltInExceptions.READER_INVALID_FLOAT;
    };
    BuiltInExceptions.prototype.readerExpectedFloat = function () {
        return BuiltInExceptions.READER_EXPECTED_FLOAT;
    };
    BuiltInExceptions.prototype.readerExpectedBool = function () {
        return BuiltInExceptions.READER_EXPECTED_BOOL;
    };
    BuiltInExceptions.prototype.readerExpectedSymbol = function () {
        return BuiltInExceptions.READER_EXPECTED_SYMBOL;
    };
    BuiltInExceptions.prototype.dispatcherUnknownCommand = function () {
        return BuiltInExceptions.DISPATCHER_UNKNOWN_COMMAND;
    };
    BuiltInExceptions.prototype.dispatcherUnknownArgument = function () {
        return BuiltInExceptions.DISPATCHER_UNKNOWN_ARGUMENT;
    };
    BuiltInExceptions.prototype.dispatcherExpectedArgumentSeparator = function () {
        return BuiltInExceptions.DISPATCHER_EXPECTED_ARGUMENT_SEPARATOR;
    };
    BuiltInExceptions.prototype.dispatcherParseException = function () {
        return BuiltInExceptions.DISPATCHER_PARSE_EXCEPTION;
    };
    BuiltInExceptions.FLOAT_TOO_SMALL = new DynamicCommandExceptionType_1.default(function (found, min) { return new LiteralMessage_1.default("Float must not be less than " + min + ", found " + found); });
    BuiltInExceptions.FLOAT_TOO_BIG = new DynamicCommandExceptionType_1.default(function (found, max) { return new LiteralMessage_1.default("Float must not be more than " + max + ", found " + found); });
    BuiltInExceptions.INTEGER_TOO_SMALL = new DynamicCommandExceptionType_1.default(function (found, min) { return new LiteralMessage_1.default("Integer must not be less than " + min + ", found " + found); });
    BuiltInExceptions.INTEGER_TOO_BIG = new DynamicCommandExceptionType_1.default(function (found, max) { return new LiteralMessage_1.default("Integer must not be more than " + max + ", found " + found); });
    BuiltInExceptions.LITERAL_INCORRECT = new DynamicCommandExceptionType_1.default(function (expected) { return new LiteralMessage_1.default("Expected literal " + expected); });
    BuiltInExceptions.READER_EXPECTED_START_OF_QUOTE = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Expected quote to start a string"));
    BuiltInExceptions.READER_EXPECTED_END_OF_QUOTE = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Unclosed quoted string"));
    BuiltInExceptions.READER_INVALID_ESCAPE = new DynamicCommandExceptionType_1.default(function (character) { return new LiteralMessage_1.default("Invalid escape sequence '" + character + "' in quoted string"); });
    BuiltInExceptions.READER_INVALID_BOOL = new DynamicCommandExceptionType_1.default(function (value) { return new LiteralMessage_1.default("Invalid bool, expected true or false but found '" + value + "'"); });
    BuiltInExceptions.READER_INVALID_INT = new DynamicCommandExceptionType_1.default(function (value) { return new LiteralMessage_1.default("Invalid integer '" + value + "'"); });
    BuiltInExceptions.READER_EXPECTED_INT = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Expected integer"));
    BuiltInExceptions.READER_INVALID_FLOAT = new DynamicCommandExceptionType_1.default(function (value) { return new LiteralMessage_1.default("Invalid float '" + value + "'"); });
    BuiltInExceptions.READER_EXPECTED_FLOAT = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Expected float"));
    BuiltInExceptions.READER_EXPECTED_BOOL = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Expected bool"));
    BuiltInExceptions.READER_EXPECTED_SYMBOL = new DynamicCommandExceptionType_1.default(function (symbol) { return new LiteralMessage_1.default("Expected '" + symbol + "'"); });
    BuiltInExceptions.DISPATCHER_UNKNOWN_COMMAND = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Unknown command"));
    BuiltInExceptions.DISPATCHER_UNKNOWN_ARGUMENT = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Incorrect argument for command"));
    BuiltInExceptions.DISPATCHER_EXPECTED_ARGUMENT_SEPARATOR = new SimpleCommandExceptionType_1.default(new LiteralMessage_1.default("Expected whitespace to end one argument, but found trailing data"));
    BuiltInExceptions.DISPATCHER_PARSE_EXCEPTION = new DynamicCommandExceptionType_1.default(function (message) { return new LiteralMessage_1.default(("Could not parse command: " + message)); });
    return BuiltInExceptions;
}());
exports.default = BuiltInExceptions;
//# sourceMappingURL=BuiltInExceptions.js.map