import { NgxParameter, SubpatcherNode } from "./parameter";
import { PatcherMeta } from "./patcher";
import { DeviceChannel } from "./audio";
import { NgxPortInfo } from "./messaging";
import { TaggedDataRef } from "./buffers";
import { BaseDevice} from "@rnbo/js";
export type LoadTargetType = 'audio'|'device'|'patcher'|'preset'|'buffer'|'url'|'schedule'|'none';
export type DeviceMeta = PatcherMeta & {
    id: string, 
    patcherTree: SubpatcherNode
    hasMidiIn: boolean, 
    hasMidiOut: boolean,
    presets: Map<string, IPreset>
    buffers: Map<string, TaggedDataRef>
};

export interface NgxDevice extends BaseDevice {
    meta: DeviceMeta;
    inlets: DeviceChannel[];
    outlets: DeviceChannel[];
    inports: NgxPortInfo[];
    outports: NgxPortInfo[];
    parameters: NgxParameter[]; 
}