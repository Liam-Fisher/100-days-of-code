import { from } from "rxjs";
import { RnboBufferService } from "../services/buffers/rnbo-buffer-service.service";
import { RnboPresetsService } from "../services/presets/rnbo-presets.service";
import { PresetAction } from "../types/preset";
import { BufferAction } from "../types/buffers";
import { RnboTimingService } from "../services/timing/timing.service";
import { TimingAction } from "../types/timing";



export function bufferAction(this: RnboBufferService, action: BufferAction | null) {
    if (!action) return;
    const { mode, target } = action;
    let { id, channel, offset } = target;
    let buffer = this.map.get(id);
    try {
        if (!buffer) throw new Error(`Buffer ${id} not found.`);
        if (mode === 'read') {
            if (typeof channel === 'number') {
                if (action.value instanceof Float32Array) {
                    buffer.copyFromChan(action.value, channel, offset);
                }
                else {
                    action.value = buffer.readChan(channel);
                }
            }
            else {
                if (Array.isArray(action.value)) {
                    let matched = buffer.copyFromAudio(action.value);
                    if (!matched) throw new Error(`Data dimensions do not match buffer dimensions.`);
                }
                else {
                    action.value = buffer.readAudioAsData();
                }
            }
        }
        else if (mode === 'write') {
            if (typeof channel === 'number') {
                if (action.value instanceof Float32Array) {
                    buffer.copyToChan(action.value, channel, offset);
                }
                else {
                    throw new Error(`Invalid buffer write action. value ${action.value} Must be a Float32Array.`);
                }
            }
            else {
                if (Array.isArray(action.value)) {
                    let matched = buffer.copyToAudio(action.value);
                    if (!matched) throw new Error(`Data dimensions do not match buffer dimensions.`);
                }
                else {
                    throw new Error('Invalid buffer write action. Must be an array of Float32Arrays.');
                }
            }
        }
        else {
            throw new Error(`Invalid buffer command method: ${mode}.`);
        }
    }
    catch (e) {
        return from(`Error executing buffer command: ${mode}. ${e}`);
    }
    return action;
}

export async function presetAction(this: RnboPresetsService, action: PresetAction | null) {
    if (!action) return;
    const { type, id } = action;
    this.changeSelection(id);
    try {
        switch (type) {
            case 'create': await this.create(); break;
            case 'update': await this.update(); break;
            case 'load': await this.load(); break;
            case 'delete': await this.delete(); break;
        }
    }
    catch (e) {
        return `Error executing command: ${type} ${id}. ${e}`;
    }
    return `Command executed: ${type} ${id}`;
}

export function timingAction(this: RnboTimingService, action: TimingAction | null) {
    if (!action) return;
    const { type, data } = action;
    try {
        switch (type) {
            case 'beattime':
                if (typeof data !== 'number') throw new Error(`Invalid beattime value: ${data}. Must be a number.`);
                this.beattime.set(data);
                break;
            case 'tempo':
                if (typeof data !== 'number') throw new Error(`Invalid tempo value: ${data}. Must be a number.`);
                this.tempo.set(data);
                break;
            case 'timeSignature':
                if (!Array.isArray(data) || data.length !== 2) throw new Error(`Invalid timeSignature value: ${data}. Must be an array of two numbers.`);
                this.timeSignature.set(data);
                break;
            case 'transport':
                if (typeof data !== 'boolean') throw new Error(`Invalid transport value: ${data}. Must be a boolean.`);
                this.transport.set(data);
                break;
            default:
                console.log(`Invalid timing event type`, type);
                throw new Error(`Invalid timing event`);
        }
    }
    catch (e) {
        console.error(e);
        return `Error executing timing action: ${type}. with data ${data}`;
    }
    return `Timing action executed: ${type}`;
}