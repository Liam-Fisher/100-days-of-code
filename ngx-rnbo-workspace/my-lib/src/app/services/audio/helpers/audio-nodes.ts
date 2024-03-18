import { IAudioService } from "../interface";
import { gain_in, gain_out } from "../signals";


export async function createInputNode(this: IAudioService, src: AudioNode|null) {
    let context = this?.context;
    if(!context) throw new Error('audio context is not loaded');
    if(!this.gain_in) throw new Error('no input gain node to connect to');
    src ??= this.src_node;
    if(!((src instanceof AudioNode)&&(src?.numberOfOutputs)&&(src?.context === context))) {
        try {
          const userMicrophone = await navigator.mediaDevices.getUserMedia({ audio: true });
          src = context.createMediaStreamSource(userMicrophone);
        }
        catch(e) {
          console.error('could not access media stream source');
          throw e;
        }
    }
    src.connect(this.gain_in);
    this.src_node = src;
}


export function createOutputNode(this: IAudioService , dest: AudioNode|null) {
    let context = this?.context;
    if(!context)  throw new Error('audio context is not loaded');
    if(!this.gain_out) throw new Error('no output gain node to connect to');
    dest ??= this.dest_node;
      if(!((dest instanceof AudioNode)&&(dest?.numberOfInputs)&&(dest?.context === context))) {
        try {
          const userSpeaker = context.destination;
          dest = userSpeaker;
        }
        catch(e) {
          console.log('could not access user speaker node in audio context');
          throw e;
        }
      }
    this.gain_out.connect(dest);
    this.dest_node = dest;
}

export function setInputGain(this: IAudioService, tgt: number, smooth = this.gain_smooth) {
  const time = this.context?.currentTime ?? null;
  if(time === null) return;
  this.gain_in.gain.exponentialRampToValueAtTime(tgt, time+smooth);
  gain_in.set(tgt);
}

export function setOutputGain(this: IAudioService, tgt: number, smooth = this.gain_smooth) {
  const time = this.context?.currentTime ?? null;
  if(time === null) return;
  this.gain_out.gain.exponentialRampToValueAtTime(tgt, time+smooth);
  gain_out.set(tgt);
}

export async function linkDevice(this: IAudioService, deviceNode: AudioNode) {
  
  this.device_node = deviceNode;
  
  if(this.device_node?.numberOfInputs) this.gain_in.connect(this.device_node);
  if(this.device_node?.numberOfOutputs) this.device_node.connect(this.gain_out);
  await this.setState('running');
}

export function unlinkDevice(this: IAudioService) {
  
  if(this.device_node?.numberOfInputs) this.gain_in.disconnect(this.device_node);
  if(this.device_node?.numberOfOutputs) this.device_node.disconnect(this.gain_out);
  this.device_node = null;
}
