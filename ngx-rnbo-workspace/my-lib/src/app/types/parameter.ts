import { Parameter } from "@rnbo/js";


// parameter ids are created as as array of strings, numbers, or the symbols poly, signals, and value, separated by slashes


export type ParameterFlags = {
    isEnum: boolean;
    isVisible: boolean;
    isDebug: boolean;

    isSignal: boolean;
    isPoly: boolean;
    isControl: boolean;
    isInstance: boolean;
    isTopLevel: boolean;
    isStored: boolean;
    // preset: boolean;
    // initialized: boolean;
    // saveable: boolean;
    // transmittable: boolean;
}
export type ParameterAddress = { 
    id: string;
    name: string;
    displayName: string;
    index: number;
    subpatchers: string[];
    instance: number; // if this is not an instance, this will be -1
    instances: number[]; // if this is a polyphonic parameter, this will be an array of the parameter ids for each instance, else it will be an empty array
}
export type ParameterMeta = any;
export type INgxParameter = Parameter&Partial<{
    meta: Partial<ParameterMeta>;
    flags: Partial<ParameterFlags>;
    address: Partial<ParameterAddress>
}>;    
export interface SubpatcherNode {
    name?: string; // name of the subpatcher
    parameterIndices: number[]; // indices of the default parameters in the parameter
    childNodes: SubpatcherNode[];
}