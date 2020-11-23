import CommandDispatcher from "./lib/CommandDispatcher"
import { DefaultType } from "./lib/arguments/ArgumentType"
import StringArgumentType from "./lib/arguments/StringArgumentType";
import BoolArgumentType from "./lib/arguments/BoolArgumentType";
import IntegerArgumentType from "./lib/arguments/IntegerArgumentType";
import FloatArgumentType from "./lib/arguments/FloatArgumentType";

export {default as CommandDispatcher} from "./lib/CommandDispatcher"
export {default as LiteralMessage} from "./lib/LiteralMessage"
export {default as ParseResults} from "./lib/ParseResults"
export {default as StringReader} from "./lib/StringReader"
export {default as LiteralArgumentBuilder, literal } from "./lib/builder/LiteralArgumentBuilder"
export {default as RequiredArgumentBuilder, argument } from "./lib/builder/RequiredArgumentBuilder"
export {default as CommandContext} from "./lib/context/CommandContext"
export {default as CommandContextBuilder} from "./lib/context/CommandContextBuilder"
export {default as ParsedArgument} from "./lib/context/ParsedArgument"
export {default as ParsedCommandNode} from "./lib/context/ParsedCommandNode"
export {default as StringRange} from "./lib/context/StringRange"
export {default as SuggestionsContext} from "./lib/context/SuggestionContext"
export {default as CommandSyntaxException} from "./lib/exceptions/CommandSyntaxException"
export {default as DynamicCommandExceptionType} from "./lib/exceptions/DynamicCommandExceptionType"
export {default as SimpleCommandExceptionType} from "./lib/exceptions/SimpleCommandExceptionType"
export {default as Suggestion} from "./lib/suggestion/Suggestion"
export {default as Suggestions} from "./lib/suggestion/Suggestions"
export {default as SuggestionsBuilder} from "./lib/suggestion/SuggestionsBuilder";
export {default as ArgumentCommandNode} from "./lib/tree/ArgumentCommandNode"
export {default as LiteralCommandNode} from "./lib/tree/LiteralCommandNode"
export {default as RootCommandNode} from "./lib/tree/RootCommandNode"
export {default as ArgumentType} from "./lib/arguments/ArgumentType"

export const word: ()=>StringArgumentType = DefaultType.word
export const string: ()=>StringArgumentType = DefaultType.string
export const greedyString: ()=>StringArgumentType = DefaultType.greedyString
export const bool: ()=>BoolArgumentType = DefaultType.bool
export const integer: (min: number, max: number)=>IntegerArgumentType = DefaultType.integer
export const float: (min: number, max: number)=>FloatArgumentType = DefaultType.float

export const dispatcher = new CommandDispatcher();
