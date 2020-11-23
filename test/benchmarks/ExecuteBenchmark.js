const Benchmark = require('benchmark');
const { literal, CommandDispatcher } = require("../../dist")

const dispatcher = new CommandDispatcher();
dispatcher.register(literal("command").executes(() => 0));
dispatcher.register(literal("redirect").redirect(dispatcher.getRoot()));
dispatcher.register(literal("fork").fork(dispatcher.getRoot(), () => [{}, {}, {}]));
const simple = dispatcher.parse("command", {});
const singleRedirect = dispatcher.parse("redirect command", {});
const forkedRedirect = dispatcher.parse("fork command", {});

const ExecuteSimple = {
	defer: true,
	async fn(deferred){
		dispatcher.execute(await simple).then(()=>deferred.resolve());
	}
};

const ExecuteSingleRedirect = {
	defer: true,
	async fn(deferred){
		dispatcher.execute(await singleRedirect).then(()=>deferred.resolve());
	}
};

const ExecuteForkedRedirect = {
	defer: true,
	async fn(deferred){
		dispatcher.execute(await forkedRedirect).then(()=>deferred.resolve());
	}
};

module.exports = {ExecuteSimple, ExecuteSingleRedirect, ExecuteForkedRedirect};