import { NgxDevice } from "../../../types/device";
import { IAudioService } from "../interface";
import { baseLatency, ctx_state, gain_in, gain_out, outputLatency } from "../signals";



export async function createAudioGraph(this: IAudioService, device: NgxDevice) {

    let context = this.context;
    if(!context) throw new Error('audio context is not loaded');
    if(this.state()!=='running') {
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
    this.linkDevice(device.node);
    this.isLoaded.set(true);
} 

export async function setState(this: IAudioService, state: 'running'|'suspended'|'closed') {
    let context = this?.context;
    
    if(!context) throw new Error('audio context is not defined');

    if(this.state()===state) {
        console.log('audio context is already in this state');
        return;
    }
    console.log('setting audio context state '+state);
    this.state.set(state);
    switch(state) {
        case 'suspended':
            await context.suspend();
            return;
        case 'closed':
            this.unlinkDevice();
            this.isLoaded.set(false);
            return;
        case 'running':
            try {
                await context.resume();
                this.isLoaded.set(true);
            } 
            catch (e) {
                console.error('error resuming audio context', e);
            }
            return;
        default:
            console.error('invalid state', state);
            return;
        }
}


