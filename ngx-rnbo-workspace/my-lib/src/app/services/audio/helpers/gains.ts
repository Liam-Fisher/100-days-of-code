import { AudioService } from "../audio.service";

export async function createGains(this: AudioService) {
  
  if(!this.src_node || !this.dest_node) throw new Error('source and destination nodes must be created before gains');
  
  if(!this.gain_in) this.gain_in = this.ctx.createGain();
  if(!this.gain_out) this.gain_out = this.ctx.createGain();

  this.src_node.connect(this.gain_in);
  this.gain_out.connect(this.dest_node);

  this.gain_in_sig.set(this.gain_in.gain.value);
  this.gain_out_sig.set(this.gain_out.gain.value);
  
}
export async function destroyGains(this: AudioService) {
    
    if(!this.gain_in || !this.gain_out) throw new Error('gains must be defined to destroy them');
    
    if(this.src_node&&this.gain_in) this.src_node.disconnect(this.gain_in);
    if(this.gain_out&&this.dest_node) this.gain_out.disconnect(this.dest_node);
  
    this.gain_in = null;
    this.gain_out = null;
  
    this.gain_in_sig.set(0);
    this.gain_out_sig.set(0);
  
}


export function setInputGain(this: AudioService, tgt: number, smooth = this.gain_smooth) {
    const time = this.context?.currentTime ?? null;
    if(time === null) return;
    if(!this.gain_in) throw new Error('input gain must be created to set it');
    this.gain_in.gain.exponentialRampToValueAtTime(tgt, time+smooth);
    this.gain_in_sig.set(tgt);
  }
  
  export function setOutputGain(this: AudioService, tgt: number, smooth = this.gain_smooth) {
    const time = this.context?.currentTime ?? null;
    if(time === null) return;
    if(!this.gain_out) throw new Error('output gain must be created to set it');
    this.gain_out.gain.exponentialRampToValueAtTime(tgt, time+smooth);
    this.gain_out_sig.set(tgt);
  }