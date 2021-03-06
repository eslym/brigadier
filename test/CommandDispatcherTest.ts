import { assert, expect } from "chai"
import Command from "../src/lib/Command"
import RedirectModifier from "../src/lib/RedirectModifier"
import CommandDispatcher from "../src/lib/CommandDispatcher"
import CommandSyntaxException from "../src/lib/exceptions/CommandSyntaxException"
import { literal } from "../src/lib/builder/LiteralArgumentBuilder"
import { argument } from "../src/lib/builder/RequiredArgumentBuilder"
import { DefaultType } from "../src/lib/arguments/ArgumentType"
import StringReader from "../src/lib/StringReader";

const { integer } = DefaultType

interface MockedCommand<S> extends Command<S> {
	execHistory: object;
	when(arg: any, returnValue: number): void;
	verify(arg: any): number;
}

const createMockedCommand = (): MockedCommand<Object> => {
	const execHistory = [];
	const execCount = [];
	const whenArg = new Map<any, number>();
	const command = async (arg): Promise<number> => {
		let i = execHistory.indexOf(arg);
		if (i === -1) {
			i = execCount.length;
			execCount[i] = 0;
			execHistory[i] = arg;
		}
		execCount[i]++;

		if (whenArg.has(arg))
			return whenArg.get(arg);

		if (whenArg.has("anything"))
			return whenArg.get("anything");

		return 69;
	}
	command.verify = (arg) => {
		let i = execHistory.indexOf(arg);
		if (i > -1)
			return execCount[i];
		else if (arg === "anything") {
			let result = 0;
			execCount.forEach(v => result += v);
			return result;
		}
	}
	command.when = (o, r: number) => {
		whenArg.set(o, r);
	}
	command.execHistory	= execHistory;
	return command;
}

describe('CommandDispatcherTest', () => {

	let command;
	let subject: CommandDispatcher<Object>;
	const source: Object = {};

	beforeEach(() => {
		subject = new CommandDispatcher();

		command = createMockedCommand();
		command.when("anything", 42);
	})

	function inputWithOffset(input: string, offset: number): StringReader {
		const result = new StringReader(input);
		result.setCursor(offset);
		return result;
	}

	it('testCreateAndExecuteCommand', async () => {
		subject.register(literal("foo").executes(command));
        assert.equal(await subject.execute("foo", source), 42);
		assert.equal(command.verify("anything") === 1, true);
    })

    it('testCreateAndExecuteOffsetCommand', async () => {
        subject.register(literal("foo").executes(command));
        assert.equal(await subject.execute(inputWithOffset("/foo", 1), source), 42);
        assert.equal(command.verify("anything") === 1, true);
    })

    it('testCreateAndMergeCommands', async () => {
        subject.register(literal("base").then(literal("foo").executes(command)));
        subject.register(literal("base").then(literal("bar").executes(command)));

        assert.equal(await subject.execute("base foo", source), 42);
        assert.equal(await subject.execute("base bar", source), 42);
        assert.equal(command.verify("anything") === 2, true);
    })

    it('testExecuteUnknownCommand', async done => {
        subject.register(literal("bar"));
        subject.register(literal("baz"));

        try {
            await subject.execute("foo", source);
        } catch (ex) {
            assert.equal(CommandSyntaxException.prototype.getType.call(ex), CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownCommand());
            assert.equal(CommandSyntaxException.prototype.getCursor.call(ex), 0);
            done();
            return;
        }

        assert.fail();
    })

    it('testExecuteImpermissibleCommand', async done => {
        subject.register(literal("foo").requires(async s => false));

        try {
            await subject.execute("foo", source);
        } catch (ex) {
            assert.equal(CommandSyntaxException.prototype.getType.call(ex), CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownCommand());
            assert.equal(CommandSyntaxException.prototype.getCursor.call(ex), 0);
            done();
            return;
        }

        assert.fail();
    })

    it('testExecuteEmptyCommand', async done => {
        subject.register(literal(""));

        try {
            await subject.execute("", source);
        } catch (ex) {
            assert.equal(CommandSyntaxException.prototype.getType.call(ex), CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownCommand());
            assert.equal(CommandSyntaxException.prototype.getCursor.call(ex), 0);
            done();
            return;
        }

        assert.fail();
    })

    it('testExecuteUnknownSubcommand', async done => {
        subject.register(literal("foo").executes(command));

        try {
            await subject.execute("foo bar", source);
        } catch (ex) {
            assert.equal(CommandSyntaxException.prototype.getType.call(ex), CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownArgument());
            assert.equal(CommandSyntaxException.prototype.getCursor.call(ex), 4);
            done();
            return;
        }

        assert.fail();
    })

    it('testExecuteIncorrectLiteral', async done => {
        subject.register(literal("foo").executes(command).then(literal("bar")));

        try {
            await subject.execute("foo baz", source);
        } catch (ex) {
            assert.equal(CommandSyntaxException.prototype.getType.call(ex), CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownArgument());
            assert.equal(CommandSyntaxException.prototype.getCursor.call(ex), 4);
            done();
            return;
        }

        assert.fail();
    })

    it('testExecuteAmbiguousIncorrectArgument', async done => {
        subject.register(
            literal("foo").executes(command)
                .then(literal("bar"))
                .then(literal("baz"))
        );

        try {
            await subject.execute("foo unknown", source);
        } catch (ex) {
            assert.equal(CommandSyntaxException.prototype.getType.call(ex), CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownArgument());
            assert.equal(CommandSyntaxException.prototype.getCursor.call(ex), 4);
            done();
            return;
        }

        assert.fail();
    })

    it('testExecuteSubcommand', async () => {
		const subCommand = createMockedCommand()
		subCommand.when("anything", 100);

        subject.register(literal("foo").then(
            literal("a")
        ).then(
            literal("=").executes(subCommand)
        ).then(
            literal("c")
        ).executes(command));

        assert.equal(await subject.execute("foo =", source), 100);
        assert.equal(subCommand.verify("anything") === 1, true);
    })

    it('testParseIncompleteLiteral', async () => {
        subject.register(literal("foo").then(literal("bar").executes(command)));

        const parse = await subject.parse("foo ", source);
        assert.equal(parse.getReader().getRemaining(), " ");
        assert.equal(parse.getContext().getNodes().length, 1);
    })

    it('testParseIncompleteArgument', async () => {
        subject.register(literal("foo").then(argument("bar", integer()).executes(command)));

        const parse = await subject.parse("foo ", source);
        assert.equal(parse.getReader().getRemaining(), " ");
        assert.equal(parse.getContext().getNodes().length, 1);
    })

    it('testExecuteAmbiguiousParentSubcommand', async () => {
        const subCommand = createMockedCommand()
		subCommand.when("anything", 100);

        subject.register(
            literal("test")
                .then(
                    argument("incorrect", integer())
                        .executes(command)
                )
                .then(
                    argument("right", integer())
                        .then(
                            argument("sub", integer())
                                .executes(subCommand)
                        )
                )
        );

        assert.equal(await subject.execute("test 1 2", source), 100);
        assert.equal(subCommand.verify("anything") > 0, true);
        assert.equal(command.verify("anything") === 0, true);
    })

    it('testExecuteAmbiguiousParentSubcommandViaRedirect', async () => {
        const subCommand = createMockedCommand()
		subCommand.when("anything", 100);

        const real = subject.register(
            literal("test")
                .then(
                    argument("incorrect", integer())
                        .executes(command)
                )
                .then(
                    argument("right", integer())
                        .then(
                            argument("sub", integer())
                                .executes(subCommand)
                        )
                )
        );

        subject.register(literal("redirect").redirect(real));

        assert.equal(await subject.execute("redirect 1 2", source), 100);
        assert.equal(subCommand.verify("anything") > 0, true);
        assert.equal(command.verify("anything") === 0, true);
    })

    it('testExecuteRedirectedMultipleTimes', async () => {
        const concreteNode = subject.register(literal("actual").executes(command));
        const redirectNode = subject.register(literal("redirected").redirect(subject.getRoot()));

        const input = "redirected redirected actual";

        const parse = await subject.parse(input, source);
        assert.equal(parse.getContext().getRange().get(input), "redirected");
        assert.equal(parse.getContext().getNodes().length, 1);
        assert.equal(parse.getContext().getRootNode(), subject.getRoot());
        expect(parse.getContext().getNodes()[0].getRange()).to.deep.equal(parse.getContext().getRange());
        assert.equal(parse.getContext().getNodes()[0].getNode(), redirectNode);

        const child1 = parse.getContext().getChild();
        expect(child1).to.not.equal(null)
        assert.equal(child1.getRange().get(input), "redirected");
        assert.equal(child1.getNodes().length, 1);
        assert.equal(child1.getRootNode(), subject.getRoot());
        expect(child1.getNodes()[0].getRange()).to.deep.equal(child1.getRange());
        assert.equal(child1.getNodes()[0].getNode(), redirectNode);

        const child2 = child1.getChild();
        expect(child2).to.not.equal(null)
        assert.equal(child2.getRange().get(input), "actual");
        assert.equal(child2.getNodes().length, 1);
        assert.equal(child2.getRootNode(), subject.getRoot());
        expect(child2.getNodes()[0].getRange()).to.deep.equal(child2.getRange());
        assert.equal(child2.getNodes()[0].getNode(), concreteNode);

        assert.equal(await subject.execute(parse), 42);
        assert.equal(command.verify("anything") > 0, true);
    })

    it('testExecuteRedirected', async () => {
		const source1 = { name: "Obj1" };
		const source2 = { name: "Obj2" };
        const mockedModifier: RedirectModifier<Object> = {
			apply(obj) {
				if (obj.getSource() === source)
					return [source1, source2]
			}
		}

        const concreteNode = subject.register(literal("actual").executes(command));
        const redirectNode = subject.register(literal("redirected").fork(subject.getRoot(), mockedModifier));

        const input = "redirected actual";
        const parse = await subject.parse(input, source);
        assert.equal(parse.getContext().getRange().get(input), "redirected");
        assert.equal(parse.getContext().getNodes().length, 1);
        assert.equal(parse.getContext().getRootNode(), subject.getRoot());
        expect(parse.getContext().getNodes()[0].getRange()).to.deep.equal(parse.getContext().getRange());
        assert.equal(parse.getContext().getNodes()[0].getNode(), redirectNode);
        assert.equal(parse.getContext().getSource(), source);

        const parent = parse.getContext().getChild();
        expect(parent).to.not.equal(null);
        assert.equal(parent.getRange().get(input), "actual");
        assert.equal(parent.getNodes().length, 1);
        assert.equal(parse.getContext().getRootNode(), subject.getRoot());
        expect(parent.getNodes()[0].getRange()).to.deep.equal(parent.getRange());
        assert.equal(parent.getNodes()[0].getNode(), concreteNode);
        assert.equal(parent.getSource(), source);
		assert.equal(await subject.execute(parse), 2);

		let flag1 = 0, flag2 = 0;
		command.execHistory.forEach(v => {
			if (v.source === source1) flag1++;
			if (v.source === source2) flag2++;
		})
		if (flag1 === 0 || flag2 === 0)
			assert.fail();
    })

    it('testExecuteOrphanedSubcommand', async done => {
        subject.register(literal("foo").then(
            argument("bar", integer())
        ).executes(command));

        try {
            await subject.execute("foo 5", source);
        } catch (ex) {
            assert.equal(CommandSyntaxException.prototype.getType.call(ex), CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownCommand());
            assert.equal(CommandSyntaxException.prototype.getCursor.call(ex), 5);
            done();
            return;
        }

        assert.fail();
    })

    it('testExecute_invalidOther', async () => {
		const wrongCommand = createMockedCommand();

        subject.register(literal("w").executes(wrongCommand));
        subject.register(literal("world").executes(command));

        assert.equal(await subject.execute("world", source), 42);
        assert.equal(wrongCommand.verify("anything") === 0, true);
        assert.equal(command.verify("anything") > 0, true);
    })

    it('parse_noSpaceSeparator', async done => {
        subject.register(literal("foo").then(argument("bar", integer()).executes(command)));

        try {
            await subject.execute("foo$", source);
        } catch (ex) {
            assert.equal(CommandSyntaxException.prototype.getType.call(ex), CommandSyntaxException.BUILT_IN_EXCEPTIONS.dispatcherUnknownCommand());
            assert.equal(CommandSyntaxException.prototype.getCursor.call(ex), 0);
            done();
            return;
        }

        assert.fail();
    })

    it('testExecuteInvalidSubcommand', async done => {
        subject.register(literal("foo").then(
            argument("bar", integer())
        ).executes(command));

        try {
            await subject.execute("foo bar", source);
        } catch (ex) {
            assert.equal(CommandSyntaxException.prototype.getType.call(ex), CommandSyntaxException.BUILT_IN_EXCEPTIONS.readerExpectedInt());
            assert.equal(CommandSyntaxException.prototype.getCursor.call(ex), 4);
            done();
            return;
        }

        assert.fail();
    })

    it('testGetPath', () => {
        const bar = literal("bar").build();
        subject.register(literal("foo").then(bar));

        expect(subject.getPath(bar)).to.deep.equal(["foo", "bar"]);
    })

    it('testFindNodeExists', () => {
        const bar = literal("bar").build();
        subject.register(literal("foo").then(bar));

        assert.equal(subject.findNode(["foo", "bar"]), bar);
    })

    it('testFindNodeDoesntExist', () => {
        expect(subject.findNode(["foo", "bar"])).to.equal(null);
    })
})


