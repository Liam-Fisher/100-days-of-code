import { Signal, WritableSignal, output } from "@angular/core";
import { NgxDevice } from "../../types/device";
export interface IAudioService {
  
    context: AudioContext|null;
    src_node: AudioNode|null;
    device_node: AudioNode|null;
    dest_node: AudioNode|null;
    state: WritableSignal<'running'|'suspended'|'closed'>;
    gain_in: GainNode;
    gain_out: GainNode;
    gain_smooth: number;
    isReady: WritableSignal<boolean>;  
    
    createAudioGraph: (device: NgxDevice) => Promise<void>;
    createInputNode: (src: AudioNode|null) => Promise<void>;
    createOutputNode: (dest: AudioNode|null) => void;

    linkDevice: (deviceNode: AudioNode) => void;
    unlinkDevice: () => void;
    setInputGain: (tgt: number, smooth?: number) => void; 
    setOutputGain: (tgt: number, smooth?: number) => void;

    setState: (state: 'running'|'suspended'|'closed') => Promise<void>;
}
