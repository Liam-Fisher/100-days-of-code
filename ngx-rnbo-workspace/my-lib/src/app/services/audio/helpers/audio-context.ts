import { NgxDevice } from "../../../types/device";
import { IAudioService } from "../interface";
import { baseLatency, ctx_state, gain_in, gain_out, outputLatency } from "../signals";



export async function createAudioGraph(this: IAudioService, device: NgxDevice|null) {

    let deviceNode = device?.node;
    let context = this.context;
    if(!context) throw new Error('audio context is not loaded');
    if(ctx_state()!=='running') {
        await this.setState('running');
    }   
    let src = this.src_node;
    let dest = this.dest_node;
    this.gain_in = context.createGain();
    this.gain_out = context.createGain();

    gain_in.set(this.gain_in.gain.value);
    gain_out.set(this.gain_out.gain.value);

    await this.createInputNode(src);
    this.createOutputNode(dest);

    baseLatency.set(context?.baseLatency??-1);
    outputLatency.set(context?.outputLatency??-1);

    if(deviceNode){
    this.linkDevice(deviceNode);
    }

} 

export async function setState(this: IAudioService, state: 'running'|'suspended'|'closed') {
    let context = this?.context;
    
    if(!context) throw new Error('audio context is not defined');

    if(ctx_state()===state) {
        console.log('audio context is already in this state');
        return;
    }

    switch(state) {
        case 'running':
            ctx_state.set('running');
            return await context.resume();
        case 'suspended':
            ctx_state.set('suspended');
            return await context.suspend();
        default:
            ctx_state.set('closed');
            await context?.close();
            this.unlinkDevice();
        }
}


