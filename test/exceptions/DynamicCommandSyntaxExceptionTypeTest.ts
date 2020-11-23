import { assert } from "chai"
import StringReader from "../../src/lib/StringReader"
import LiteralMessage from "../../src/lib/LiteralMessage"
import DynamicCommandExceptionType from "../../src/lib/exceptions/DynamicCommandExceptionType"
import CommandSyntaxException from "../../src/lib/exceptions/CommandSyntaxException";

describe('DynamicCommandSyntaxExceptionTypeTest', () => {

	const type = new DynamicCommandExceptionType(name => new LiteralMessage("Hello, " + name + "!"));

	it('createWithContext', () => {
		const reader = new StringReader("Foo bar");
        reader.setCursor(5);
        const exception = type.createWithContext(reader, "World");
        assert.deepEqual(CommandSyntaxException.prototype.getType.call(exception), type);
        assert.equal(CommandSyntaxException.prototype.getInput.call(exception), "Foo bar");
        assert.equal(CommandSyntaxException.prototype.getCursor.call(exception), 5);
	})
})