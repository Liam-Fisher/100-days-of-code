import { Injectable,  signal } from '@angular/core';
import { IAudioService } from './interface';
import { createAudioGraph, setState } from './helpers/audio-context';
import { createInputNode, createOutputNode, linkDevice, setInputGain, setOutputGain, unlinkDevice } from './helpers/audio-nodes';
import { ctx_state } from './signals';

@Injectable({
  providedIn: 'root'
})
export class AudioService implements IAudioService {
  context: AudioContext|null = null;
  src_node: AudioNode|null = null;
  device_node: AudioNode|null = null;
  dest_node: AudioNode|null = null;
  gain_in!: GainNode;
  gain_out!: GainNode;
  gain_smooth = 0.05;

  state = signal<'running'|'suspended'|'closed'> ('closed');

  createAudioGraph: IAudioService["createAudioGraph"] = createAudioGraph.bind(this);
  createInputNode: IAudioService["createInputNode"] = createInputNode.bind(this);
  createOutputNode: IAudioService["createOutputNode"] = createOutputNode.bind(this);
  
  setInputGain: IAudioService["setInputGain"] = setInputGain.bind(this);
  setOutputGain: IAudioService["setOutputGain"] = setOutputGain.bind(this);

  linkDevice: IAudioService["linkDevice"] = linkDevice.bind(this);
  unlinkDevice: IAudioService["unlinkDevice"] = unlinkDevice.bind(this);

  setState: IAudioService["setState"] = setState.bind(this);
  
  constructor() { }
  initContext(context: AudioContext|null) {
    if(context === null) return; 
  this.context = context;
  console.log('audio context initialized');
  this.context.onstatechange = () => {
      ctx_state.set(this.context?.state??'closed');
      console.log('audio context state changed to '+this.context?.state);
  };
}

}
