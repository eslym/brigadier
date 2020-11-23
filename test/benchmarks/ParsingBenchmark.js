const { literal, CommandDispatcher } = require("../../dist")

const subject = new CommandDispatcher();
subject.register(
	literal("a")
		.then(
			literal("1")
				.then(literal("i").executes(() => 0))
				.then(literal("ii").executes(() => 0))
		)
		.then(
			literal("2")
				.then(literal("i").executes(() => 0))
				.then(literal("ii").executes(() => 0))
		)
);
subject.register(literal("b").then(literal("1").executes(() => 0)));
subject.register(literal("c").executes(() => 0));
subject.register(literal("d").requires(s => false).executes(() => 0));
subject.register(
	literal("e")
		.executes(() => 0)
		.then(
			literal("1")
				.executes(() => 0)
				.then(literal("i").executes(() => 0))
				.then(literal("ii").executes(() => 0))
		)
);
subject.register(
	literal("f")
		.then(
			literal("1")
				.then(literal("i").executes(() => 0))
				.then(literal("ii").executes(() => 0).requires(s => false))
		)
		.then(
			literal("2")
				.then(literal("i").executes(() => 0).requires(s => false))
				.then(literal("ii").executes(() => 0))
		)
);
subject.register(
	literal("g")
		.executes(() => 0)
		.then(literal("1").then(literal("i").executes(() => 0)))
);
const h = subject.register(
	literal("h")
		.executes(() => 0)
		.then(literal("1").then(literal("i").executes(() => 0)))
		.then(literal("2").then(literal("i").then(literal("ii").executes(() => 0))))
		.then(literal("3").executes(() => 0))
);
subject.register(
	literal("i")
		.executes(() => 0)
		.then(literal("1").executes(() => 0))
		.then(literal("2").executes(() => 0))
);
subject.register(
	literal("j")
		.redirect(subject.getRoot())
);
subject.register(
	literal("k")
		.redirect(h)
);

module.exports = {
	Parse_A_1_I: {
		defer: true,
		fn(deferred){
			subject.parse("a 1 i", {}).then(deferred.resolve());
		}
	},
	Parse_C: {
		defer: true,
		fn(deferred){
			subject.parse("c", {}).then(deferred.resolve());
		}
	},
	Parse_K_1_I: {
		defer: true,
		fn(deferred){
			subject.parse("k 1 i", {}).then(deferred.resolve());
		}
	}
};
