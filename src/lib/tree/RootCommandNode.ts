import CommandNode from "./CommandNode"
import StringReader from "../StringReader"
import ArgumentBuilder from "../builder/ArgumentBuilder"
import CommandContext from "../context/CommandContext"
import CommandContextBuilder from "../context/CommandContextBuilder"
import Suggestions from "../suggestion/Suggestions"
import SuggestionsBuilder from "../suggestion/SuggestionsBuilder"

export default class RootCommandNode<S> extends CommandNode<S> {

    public constructor () {
        super(null, async _ => true, null, (s: CommandContext<S>) => s.getSource(), false);
	}

	public getNodeType(): string {
		return "root"
	}

    public getName(): string {
        return "";
    }

    public getUsageText(): string {
        return "";
    }

    public parse(_: StringReader, __: CommandContextBuilder<S>) {

    }

    public listSuggestions(_: CommandContext<S>, __: SuggestionsBuilder): Promise<Suggestions> {
        return Suggestions.empty();
    }

    public isValidInput(_: String): boolean {
        return false;
    }

    public equals(o: object): boolean {

		if (this === o) return true;
        if (!(o instanceof RootCommandNode)) return false;

        return super.equals(o);
    }

    public createBuilder(): ArgumentBuilder<S, any> {
        throw new Error("Cannot convert root into a builder");
    }

    public getSortedKey(): string {
        return "";
    }

    public getExamples(): Iterable<string> {
        return [];
    }

    public toString(): string {
        return "<root>";
    }
}
