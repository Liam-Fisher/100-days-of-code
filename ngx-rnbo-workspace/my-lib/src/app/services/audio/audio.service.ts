import { Injectable,  signal } from '@angular/core';
import { IAudioService } from './interface';
import { createAudioGraph, setState } from './helpers/audio-context';
import { createInputNode, createOutputNode, linkDevice, setInputGain, setOutputGain, unlinkDevice } from './helpers/audio-nodes';
import { ctx_state } from './signals';

@Injectable({
  providedIn: 'root'
})
export class AudioService implements IAudioService {
  context!: AudioContext;
  src_node: AudioNode|null = null;
  device_node: AudioNode|null = null;
  dest_node: AudioNode|null = null;
  gain_in!: GainNode;
  gain_out!: GainNode;
  gain_smooth = 0.05;

  state = signal<'running'|'suspended'|'closed'> ('closed');
  isLoaded = signal<boolean>(false); // this is a signal because we want to wait for the audio context to be loaded properly, i.e. via user click before we start loading devices
  createAudioGraph: IAudioService["createAudioGraph"] = createAudioGraph.bind(this);
  createInputNode: IAudioService["createInputNode"] = createInputNode.bind(this);
  createOutputNode: IAudioService["createOutputNode"] = createOutputNode.bind(this);
  
  setInputGain: IAudioService["setInputGain"] = setInputGain.bind(this);
  setOutputGain: IAudioService["setOutputGain"] = setOutputGain.bind(this);

  linkDevice: IAudioService["linkDevice"] = linkDevice.bind(this);
  unlinkDevice: IAudioService["unlinkDevice"] = unlinkDevice.bind(this);

  setState: IAudioService["setState"] = setState.bind(this);
  
  constructor() { }
}
