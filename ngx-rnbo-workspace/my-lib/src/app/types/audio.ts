// src_id, src_outlet, tgt_id, tgt_inlet
///type NodeConnection =  [number, number, number, number]


// Inputs
type SourceNode = OscillatorNode | AudioBufferSourceNode | MediaElementAudioSourceNode | MediaStreamAudioSourceNode;
// Outputs
type SinkNode = AnalyserNode | AudioDestinationNode | MediaStreamAudioDestinationNode;
// computationally expensive nodes. Use sparingly, generally before rendering 
type MixerNode = PannerNode | DynamicsCompressorNode | ConvolverNode ; 
// the basic building blocks of dsp
type SimpleNode = ChannelMergerNode | ChannelSplitterNode | DelayNode | GainNode ;
// nodes that can be used to create effects
type EffectNode =  BiquadFilterNode | WaveShaperNode | IIRFilterNode;

  // node ID: [outputIndex, inputIndex]
  export type connection = Record<string, [number?, number?]>;
  // [source_id: string, source_output_index: number, sink_id: string, sink_input_index: number];
export interface ConnectionMap {
    sources: connection;
    sinks: connection;
} 
export type AudioGraph = Map<string, ConnectionMap>;

export type SignalMeta = any; // for now...

export interface DeviceChannel {
  type: 'signal'|string;
  index?: number;
  tag?: string;
  meta?: SignalMeta;
  comment?: string;
}