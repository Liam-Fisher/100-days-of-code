import { InputSignal, WritableSignal } from "@angular/core";
import { BaseDevice, IPreset } from "@rnbo/js";

import { INgxParameter, SubpatcherNode } from "./parameter";
import { PatcherMeta } from "./patcher";
import { DeviceChannel } from "./audio";
import { NgxPortInfo } from "./messaging";
import { TaggedDataRef } from "./buffers";

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
    parameters: INgxParameter[]; 
}