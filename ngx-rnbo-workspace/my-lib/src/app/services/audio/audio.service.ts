import { Injectable,  signal } from '@angular/core';
import {  createAudioGraph, createContext, destroyAudioGraph, setState } from './helpers/audio-context';
import {   createInputNode, createOutputNode } from './helpers/node-io';
import { ConnectionMap, EffectNode, MixerNode, NodeKind, SimpleNode, SinkNode, SourceNode } from '../../types/cli/audio';
import { createGains, destroyGains, setInputGain, setOutputGain } from './helpers/gains';
import { connectDevice, disconnectDevice } from './helpers/device';


@Injectable({
  providedIn: 'root'
})
export class AudioService {
  context!: AudioContext;
  src_node: AudioNode|null = null;
  device_node: AudioNode|null = null;
  dest_node: AudioNode|null = null;
  gain_in: GainNode|null = null;
  gain_out: GainNode|null = null;
  gain_in_sig = signal<number>(0);
  gain_out_sig = signal<number>(0);
  gain_smooth = 0.05;

  buffers = new Map<string, AudioBuffer>();
  nodes = new Map<string, AudioNode>();
  connections = new Map<string, ConnectionMap>();

  state = signal<'running'|'suspended'|'closed'> ('closed');
  isReady = signal<boolean>(false); // this is a signal because we want to wait for the audio context to be loaded properly, i.e. via user click before we start loading devices

  baseLatency = signal<number>(-1);
  outputLatency = signal<number>(-1);
  
  createAudioGraph = createAudioGraph.bind(this);
  destroyAudioGraph = destroyAudioGraph.bind(this); 
  createContext = createContext.bind(this);  
  createInputNode = createInputNode.bind(this);
  createOutputNode = createOutputNode.bind(this);

  createGains = createGains.bind(this);
  destroyGains = destroyGains.bind(this);
  setInputGain = setInputGain.bind(this);
  setOutputGain = setOutputGain.bind(this);

  connectDevice = connectDevice.bind(this);
  disconnectDevice = disconnectDevice.bind(this);

  setState = setState.bind(this);

  get ctx() {
    if(!this.context) throw new Error('audio context is not loaded');
    return this.context;
  }
  constructor() { }
}
