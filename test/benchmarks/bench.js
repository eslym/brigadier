const parses = require('./ParsingBenchmark')
const executes = require("./ExecuteBenchmark");

const Benchmark = require('benchmark');

const {capitalCase} = require('change-case');

const suite = new Benchmark.Suite();

for (let name in parses) {
    suite.add(capitalCase(name), parses[name]);
}

for (let name in executes) {
    suite.add(capitalCase(name), executes[name]);
}

suite.on('cycle', function (event) {
        console.info(String(event.target));
    })
    .on('complete', function () {
        console.table(Array.prototype.map.call(this, function (result) {
            return {
                Name: result.name,
                'Max (ms)': Math.max(...result.stats.sample) * 1000,
                'Min (ms)': Math.min(...result.stats.sample) * 1000,
                'Mean (ms)': result.stats.mean * 1000,
                'Elapsed (ms)': result.times.elapsed * 1000,
            };
        }));
    })
    .run({async: true});
