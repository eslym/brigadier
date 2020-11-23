import Predicate from "../Predicate";
import AmbiguityConsumer from "../AmbiguityConsumer";
import Command from "../Command";
import RedirectModifier from "../RedirectModifier";
import StringReader from "../StringReader";
import ArgumentBuilder from "../builder/ArgumentBuilder";
import CommandContext from "../context/CommandContext";
import CommandContextBuilder from "../context/CommandContextBuilder";
import Suggestions from "../suggestion/Suggestions";
import SuggestionsBuilder from "../suggestion/SuggestionsBuilder";
declare abstract class CommandNode<S> {
    private children;
    private literals;
    private args;
    private requirement;
    private redirect;
    private modifier;
    private forks;
    private command;
    abstract getNodeType(): string;
    protected constructor(command: Command<S>, requirement: Predicate<S>, redirect: CommandNode<S>, modifier: RedirectModifier<S>, forks: boolean);
    getCommand(): Command<S>;
    getChildren(): IterableIterator<CommandNode<S>>;
    getChildrenCount(): number;
    getChild(name: string): CommandNode<S>;
    getRedirect(): CommandNode<S>;
    getRedirectModifier(): RedirectModifier<S>;
    canUse(source: S): Promise<boolean>;
    addChild(node: CommandNode<S>): void;
    findAmbiguities(consumer: AmbiguityConsumer<S>): void;
    abstract isValidInput(input: string): boolean;
    equals(o: object): boolean;
    getRequirement(): Predicate<S>;
    abstract getName(): string;
    abstract getUsageText(): string;
    abstract parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void;
    abstract listSuggestions(context: CommandContext<S>, builder: SuggestionsBuilder): Promise<Suggestions>;
    abstract createBuilder(): ArgumentBuilder<S, any>;
    abstract getSortedKey(): string;
    getRelevantNodes(input: StringReader): Iterable<CommandNode<S>>;
    compareTo(o: CommandNode<S>): number;
    isFork(): boolean;
    abstract getExamples(): Iterable<string>;
}
export default CommandNode;
