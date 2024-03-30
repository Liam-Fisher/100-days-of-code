type AudioActions =  AudioContextAction | AudioNodeAction ;
type AudioContextAction = "play" | "pause" | "stop"| "new" | "query";
type AudioNodeAction = "create" | "destroy" | "connect" | "disconnect" | "set" | "query" | "param";


/**
 * AudioContextStateCommand interface.
 * 
 * This is used to control the status property of the audio context.
 * 
 * @param action - The action to take on the audio context.
 * - play - set the status to 'running', if the context is suspended, it will be resumed. 
 * - pause - Pause the audio context.
 * - stop - Stop the audio context.
 */
interface AudioContextStateCommand {
    action: AudioContextAction;
}

interface AudioContextQueryCommand {
    action: "query";
    prop: "state" | "currentTime" | "sampleRate" | "baseLatency" | "outputLatency" ;
}

/**
 * AudioContextNewCommand interface.
 * 
 * This is used to create a new audio context.
 * 
 * @param action - The action to take on the audio context.
 * @param args - An object containing the options to pass to the audio context.
 * 
 */
interface AudioContextNewCommand {
    action: "new";
    args: AudioContextOptions;
}

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

type AudioNodeClasses = {
    "Panner": PannerNode,
    "Convolver": ConvolverNode,
    "Oscillator": OscillatorNode,
    "BiquadFilter": BiquadFilterNode,
    "WaveShaper": WaveShaperNode,
    "IIRFilter": IIRFilterNode,
    "ChannelMerger": ChannelMergerNode,
    "ChannelSplitter": ChannelSplitterNode,
    "Gain": GainNode,
    "Delay": DelayNode,
    "DynamicsCompressor": DynamicsCompressorNode,
    "AudioSource": SourceNode,
}

type AudioNodeClassName = keyof AudioNodeClasses;




/**
 * 
 * CreateAudioNodeCommand interface.
 * 
 * This is used to create an audio node.
 * 
 * @param node - The type of the node to create.
 * @param id - The id of the node to create, if not provided, a unique id will be generated.
 * @param args - An array of arguments to pass to the node
 * 
 */
interface CreateAudioNodeCommand<TNode extends AudioNodeClassName> {
    node: TNode;
    id?: string;
    args: AudioNodeArg<TNode>[]
}
type AudioNodeArg<TNode extends AudioNodeClassName> = [prop: keyof AudioNodeClasses[TNode], value: AudioNodeClasses[TNode][keyof AudioNodeClasses[TNode]]];

/**
 * DestroyAudioNodeCommand interface.
 * 
 * This is used to destroy an audio node.
 * 
 * @param id - The id of the node to destroy.
 * @param patch - If true, the connections into the node will be connected to the connections made from output of the node, if false, the connections will be removed.
 */
interface DestroyAudioNodeCommand {
    id: string;
    patch?: boolean;
}


/**
 * ConnectAudioNodeCommand interface. 
 * 
 * This is used to connect two audio nodes together.
 * 
 * Note that, the source and target nodes must be created before connecting them, and the source node must have an output and the target node must have an input.
 * 
 * If the audio context is running, it will be automatically suspended and resumed after the connection is made.
 * 
 * @param source - The id of the source node.
 * @param target - The id of the target node.
 * @param output - The output index of the source node, if not provided, the default output will be used.
 * @param input - The input index of the target node, if not provided, the default input will be used.

*/
interface ConnectAudioNodeCommand {
    source: string;
    target: string;
    output?: number;
    input?: number;
}

/**
 * DisconnectAudioNodeCommand interface.
 * 
 * This is used to disconnect two audio nodes.
 * 
 * @param source - The id of the source node.
 * @param target - The id of the target node.
 * @param output - The output index of the source node, if not provided, the default output will be used.
 * @param input - The input index of the target node, if not provided, the default input will be used.
 * 
 */


interface DisconnectAudioNodeCommand {
    source: string;
    target: string;
    output?: number;
    input?: number;
}

interface QueryAudioNodeCommand {
    id: string;
    prop: keyof AudioNode;
}

type AudioParamEventType = "setValueAtTime" | "linearRampToValueAtTime" | "exponentialRampToValueAtTime" | "setTargetAtTime" | "setValueCurveAtTime" | "cancelScheduledValues";
interface AudioParamCommand<Evt extends AudioParamEventType> {
    id: string;
    param: string;
    method: Evt;
    args: Parameters<AudioParam[Evt]>; 
}


export type connection = Record<string, [number?, number?]>;
  // [source_id: string, source_output_index: number, sink_id: string, sink_input_index: number];
export interface ConnectionMap {
    sources: connection;
    sinks: connection;
} 

export interface IAudioControl {
    nodes: Map<string, AudioNode>;
    context: AudioContext;
}