import { assert } from "chai"
import { mock, instance } from "ts-mockito"
import StringReader from "../../src/lib/StringReader"
import LiteralMessage from "../../src/lib/LiteralMessage"
import CommandSyntaxException from "../../src/lib/exceptions/CommandSyntaxException"
import SimpleCommandExceptionType from "../../src/lib/exceptions/SimpleCommandExceptionType"

describe('SimpleCommandSyntaxExceptionTypeTest', () => {
	it('createWithContext', () => {
        const type = new SimpleCommandExceptionType(new LiteralMessage("error"));
        const reader = new StringReader("Foo bar");
        reader.setCursor(5);
        const exception = type.createWithContext(reader);
        assert.deepEqual(CommandSyntaxException.prototype.getType.call(exception), type);
        assert.equal(CommandSyntaxException.prototype.getInput.call(exception), "Foo bar");
        assert.equal(CommandSyntaxException.prototype.getCursor.call(exception), 5);
    })

    it('getContext_none', () => {
        const exception = new CommandSyntaxException({}, new LiteralMessage("error"));
        assert.equal(CommandSyntaxException.prototype.getContext.call(exception), null);
    })

    it('getContext_short', () => {
        const exception = new CommandSyntaxException({}, new LiteralMessage("error"), "Hello world!", 5);
        assert.equal(CommandSyntaxException.prototype.getContext.call(exception), "Hello<--[HERE]");
    })

    it('getContext_long', () => {
        const exception = new CommandSyntaxException({}, new LiteralMessage("error"), "Hello world! This has an error in it. Oh dear!", 20);
        assert.equal(CommandSyntaxException.prototype.getContext.call(exception), "...d! This ha<--[HERE]");
    })
})