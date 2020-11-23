import Command from "../Command"
import StringRange from "./StringRange"
import CommandNode from "../tree/CommandNode"
import CommandContext from "./CommandContext"
import ParsedArgument from "./ParsedArgument"
import SuggestionContext from "./SuggestionContext"
import ParsedCommandNode from "./ParsedCommandNode"
import CommandDispatcher from "../CommandDispatcher"
import RedirectModifier from "../RedirectModifier"

export default class CommandContextBuilder<S> {

    private args: Map<String, ParsedArgument<S, any>> = new Map();

    private rootNode: CommandNode<S>;

    private nodes: Array<ParsedCommandNode<S>> = [];

    private dispatcher: CommandDispatcher<S>;

    private source: S;

    private command: Command<S>;

    private child: CommandContextBuilder<S>;

    private range: StringRange;

    private modifier: RedirectModifier<S> = null;

    private forks: boolean;

    public constructor (dispatcher: CommandDispatcher<S>, source: S, rootNode: CommandNode<S>, start: number) {
        this.rootNode = rootNode;
        this.dispatcher = dispatcher;
        this.source = source;
        this.range = StringRange.at(start);
    }

    public withSource(source: S): CommandContextBuilder<S> {
        this.source = source;
        return this;
    }

    public getSource(): S {
        return this.source;
    }

    public getRootNode(): CommandNode<S> {
        return this.rootNode;
    }

    public withArgument(name: String, argument: ParsedArgument<S, any>): CommandContextBuilder<S> {
        this.args.set(name, argument);
        return this;
    }

    public getArguments(): Map<String, ParsedArgument<S, any>> {
        return this.args;
    }

    public withCommand(command: Command<S>): CommandContextBuilder<S> {
        this.command = command;
        return this;
    }

    public withNode(node: CommandNode<S>, range: StringRange): CommandContextBuilder<S> {
        this.nodes.push(new ParsedCommandNode(node, range));
        this.range = StringRange.encompassing(this.range, range);
        this.modifier = node.getRedirectModifier();
        this.forks = node.isFork();
        return this;
    }

    public copy(): CommandContextBuilder<S> {
        const copy: CommandContextBuilder<S> = new CommandContextBuilder(this.dispatcher, this.source, this.rootNode, this.range.getStart());
        copy.command = this.command;
        copy.args = new Map([...copy.args, ...this.args])
        copy.nodes.push(...this.nodes);
        copy.child = this.child;
        copy.range = this.range;
        copy.forks = this.forks;
        return copy;
    }

    public withChild(child: CommandContextBuilder<S>): CommandContextBuilder<S> {
        this.child = child;
        return this;
    }

    public getChild(): CommandContextBuilder<S> {
        return this.child;
    }

    public getLastChild(): CommandContextBuilder<S> {
        let result: CommandContextBuilder<S> = this;
        while (result.getChild() != null) {
            result = result.getChild();
        }

        return result;
    }

    public getCommand(): Command<S> {
        return this.command;
    }

    public getNodes(): Array<ParsedCommandNode<S>> {
        return this.nodes;
    }

    public build(input: string): CommandContext<S> {
		return new CommandContext<S>(this.source, input, this.args, this.command, this.rootNode, this.nodes, this.range, this.child == null ? null : this.child.build(input), this.modifier, this.forks);
    }

    public getDispatcher(): CommandDispatcher<S> {
        return this.dispatcher;
    }

    public getRange(): StringRange {
        return this.range;
    }

    public findSuggestionContext(cursor: number): SuggestionContext<S> {
        if ((this.range.getStart() <= cursor)) {
            if ((this.range.getEnd() < cursor)) {
                if ((this.child != null)) {
                    return this.child.findSuggestionContext(cursor);
                }
                else if (this.nodes.length > 0) {
                    let last: ParsedCommandNode<S> = this.nodes[this.nodes.length - 1];
                    return new SuggestionContext(last.getNode(), last.getRange().getEnd() + 1);
                }
                else {
                    return new SuggestionContext(this.rootNode, this.range.getStart());
                }
            }
            else {
                let prev: CommandNode<S> = this.rootNode;
                for (let node of this.nodes) {
                    let nodeRange: StringRange = node.getRange();
                    if (nodeRange.getStart() <= cursor && cursor <= nodeRange.getEnd()) {
                        return new SuggestionContext(prev, nodeRange.getStart());
                    }
                    prev = node.getNode();
                }
                if ((prev == null)) {
                    throw new Error("Can't find node before cursor");
                }
                return new SuggestionContext(prev, this.range.getStart());
            }
        }
        throw new Error("Can't find node before cursor");
    }
}