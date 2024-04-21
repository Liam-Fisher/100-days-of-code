
import { NgxDevice } from "../../../types/device";
import { AudioService } from "../audio.service";
import { baseLatency, gain_in, gain_out, outputLatency } from "../signals";


export async function createContext(this: AudioService) {
    this.context ??= new AudioContext();
    if(this.state()!=='running') {
        await this.setState('running');
    }   
    this.baseLatency.set(this.ctx.baseLatency??-1);
    this.outputLatency.set(this.ctx.outputLatency??-1);
}

export async function createAudioGraph(this: AudioService, device: NgxDevice) {
    await this.createContext();   
    await this.createInputNode();
    await this.createOutputNode();
    await this.createGains();
    await this.connectDevice(device);
} 

export async function destroyAudioGraph(this: AudioService) {
    await this.disconnectDevice();
    await this.destroyGains();
    await this.setState('closed');
}

export async function setState(this: AudioService, state: 'running'|'suspended'|'closed') {
    console.log('setting audio context state '+state);
    if(this.state()===state) return console.log('audio context is already in this state');
    this.state.set(state);
    switch(state) {
        case 'suspended': return await this.ctx.suspend();
        case 'closed': return await this.ctx.close();
        case 'running': return await this.ctx.resume();
        default: return console.error('invalid state', state);
    }
}