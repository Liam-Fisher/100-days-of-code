import { input, output } from "@angular/core";
import { Observable } from "rxjs";
// Basic command structure
// action: string;
// context: string;
// args: string[];

type args = string[];


interface IParameterInstanceCommand {
    context: "parameter";
    action: "set" | "get" |"info";
    id: string;
    value: string;
}
type ParameterGroupCommand = {

}
enum CommandContexts {
    "audio",
    "buffer",
    "device",
    "message",
    "midi",
    "parameter",
    "preset",
    "timing"
};
export type CommandContext = keyof typeof CommandContexts;
/**
 * ICommand interface.
 * 
 * This interface is used to define the structure of a command.
 * 
 * @example
 * const command: ICommand = {
 *   execute: () => { console.log('Command executed'); },
 * };
 */
export interface ICommand {
    context: CommandContexts;
}

export type CommandActions = {
    "audio": ["play", "stop", "pause", "resume"],
    "buffer": ["load", "unload"],
    "device": [],
    "message": ["send", "receive"],
    "midi": ["send", "receive"],
    "parameter": ["set", "get"],
    "preset": ["load", "save"],
    "timing": ["start", "stop", "pause", "resume"]
};



interface GenericCommand {
    input: Observable<string>;
    output: Observable<string>;
}

interface ContextualCommand<TCtx extends CommandContext> extends GenericCommand {
    action: string;
    context: TCtx;
    args: string[];
}
declare function execute(command: GenericCommand): Observable<string>;
declare function parseInput(command: Observable<string>): GenericCommand|Error;

declare function parseArgs(args: string[]): GenericCommand|Error;



interface SpecificCommand<TArgs extends any> extends GenericCommand {
    args: TArgs;
};