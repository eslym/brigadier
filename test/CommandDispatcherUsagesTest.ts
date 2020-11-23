import { assert, expect } from "chai"
import Command from "../src/lib/Command"
import CommandDispatcher from "../src/lib/CommandDispatcher"
import { literal } from "../src/lib/builder/LiteralArgumentBuilder"
import StringReader from "../src/lib/StringReader";

describe('CommandDispatcher Usage Test', async () => {

	let subject: CommandDispatcher<Object>;
	const source: Object = {};
	const command: Command<Object> = async () => 0;
	beforeEach(async () => {
		subject = new CommandDispatcher();
		subject.register(
            literal("a")
                .then(
                    literal("1")
                        .then(literal("i").executes(command))
                        .then(literal("ii").executes(command))
                )
                .then(
                    literal("2")
                        .then(literal("i").executes(command))
                        .then(literal("ii").executes(command))
                )
        );
        subject.register(literal("b").then(literal("1").executes(command)));
        subject.register(literal("c").executes(command));
        subject.register(literal("d").requires(async s => false).executes(command));
        subject.register(
            literal("e")
                .executes(command)
                .then(
                    literal("1")
                        .executes(command)
                        .then(literal("i").executes(command))
                        .then(literal("ii").executes(command))
                )
        );
        subject.register(
            literal("f")
                .then(
                    literal("1")
                        .then(literal("i").executes(command))
                        .then(literal("ii").executes(command).requires(async s => false))
                )
                .then(
                    literal("2")
                        .then(literal("i").executes(command).requires(async s => false))
                        .then(literal("ii").executes(command))
                )
        );
        subject.register(
            literal("g")
                .executes(command)
                .then(literal("1").then(literal("i").executes(command)))
        );
        subject.register(
            literal("h")
                .executes(command)
                .then(literal("1").then(literal("i").executes(command)))
                .then(literal("2").then(literal("i").then(literal("ii").executes(command))))
                .then(literal("3").executes(command))
        );
        subject.register(
            literal("i")
                .executes(command)
                .then(literal("1").executes(command))
                .then(literal("2").executes(command))
        );
        subject.register(
            literal("j")
                .redirect(subject.getRoot())
        );
        subject.register(
            literal("k")
                .redirect(await get("h"))
        );
	})

	async function get(command: string | StringReader) {
		const t = (await subject.parse(command, source)).getContext().getNodes();
		return t[t.length - 1].getNode();
	}

	it('testAllUsage_noCommands', () => {
        subject = new CommandDispatcher();
        const results = subject.getAllUsage(subject.getRoot(), source, true);
        assert.equal([...results.entries()].length, 0);
    })

    it('testSmartUsage_noCommands', async () => {
        subject = new CommandDispatcher();
        const results = await subject.getSmartUsage(subject.getRoot(), source);
        assert.equal([...results.entries()].length, 0);
    })

    it('testAllUsage_root', () => {
		const results = subject.getAllUsage(subject.getRoot(), source, true);
        expect(results).to.deep.equal([
            "a 1 i",
            "a 1 ii",
            "a 2 i",
            "a 2 ii",
            "b 1",
            "c",
            "e",
            "e 1",
            "e 1 i",
            "e 1 ii",
            "f 1 i",
            "f 2 ii",
            "g",
            "g 1 i",
            "h",
            "h 1 i",
            "h 2 i ii",
            "h 3",
            "i",
            "i 1",
            "i 2",
            "j ...",
            "k -> h",
		]);
    })

    it('testSmartUsage_root', async () => {
		const results = subject.getSmartUsage(subject.getRoot(), source);
		expect(results).to.deep.equal(
			new Map().set(await get("a"), "a (1|2)")
            .set(await get("b"), "b 1")
            .set(await get("c"), "c")
            .set(await get("e"), "e [1]")
            .set(await get("f"), "f (1|2)")
            .set(await get("g"), "g [1]")
            .set(await get("h"), "h [1|2|3]")
            .set(await get("i"), "i [1|2]")
            .set(await get("j"), "j ...")
			.set(await get("k"), "k -> h")
		);
    })

    it('testSmartUsage_h', async () => {
        const results = await subject.getSmartUsage(await get("h"), source);
        expect(results).to.deep.equal(new Map()
            .set(await get("h 1"), "[1] i")
            .set(await get("h 2"), "[2] i ii")
            .set(await get("h 3"), "[3]")
        );
    })

    it('testSmartUsage_offsetH', async () => {
        const offsetH = new StringReader("/|/|/h");
        offsetH.setCursor(5);

        const results = subject.getSmartUsage(await get(offsetH), source);
        expect(results).to.deep.equal(new Map()
            .set(await get("h 1"), "[1] i")
            .set(await get("h 2"), "[2] i ii")
            .set(await get("h 3"), "[3]")
        );
    })
})