import {IPatcherDescription, IPreset, IParameterDescription, BaseDevice, IPatcher, Parameter, ExternalDataInfo} from '@rnbo/js';
import { TaggedDataRef } from './buffers';
import { Channel } from './signals';

type name = {name: string};
    // as of rnbo version 1.2.4 
// should include styling information for the layout of parameter UI elements
export type PatcherMeta = any;
 // we will "as" this 
 export interface NgxPatcherDescription extends IPatcherDescription {
    meta: PatcherMeta;
    // we only need to get metadata about signals, possibly for annotation purposes
    inlets: Channel[];
    outlets: Channel[];
}


export interface NgxPatcher extends IPatcher {
    desc: NgxPatcherDescription;
}