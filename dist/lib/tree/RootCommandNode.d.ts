import CommandNode from "./CommandNode";
import StringReader from "../StringReader";
import ArgumentBuilder from "../builder/ArgumentBuilder";
import CommandContext from "../context/CommandContext";
import CommandContextBuilder from "../context/CommandContextBuilder";
import Suggestions from "../suggestion/Suggestions";
import SuggestionsBuilder from "../suggestion/SuggestionsBuilder";
export default class RootCommandNode<S> extends CommandNode<S> {
    constructor();
    getNodeType(): string;
    getName(): string;
    getUsageText(): string;
    parse(_: StringReader, __: CommandContextBuilder<S>): void;
    listSuggestions(_: CommandContext<S>, __: SuggestionsBuilder): Promise<Suggestions>;
    isValidInput(_: String): boolean;
    equals(o: object): boolean;
    createBuilder(): ArgumentBuilder<S, any>;
    getSortedKey(): string;
    getExamples(): Iterable<string>;
    toString(): string;
}
