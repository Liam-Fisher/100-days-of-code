import { AudioNodeClassShortcuts, AudioNodeClasses, ConnectionMap, NodeKind } from "../../../types/cli/audio";
import { AudioService } from "../audio.service";

export function emptyConnectionMatrix(outputs: number, inputs: number): boolean[][] {
    return new Array(outputs).fill(0).map(() => new Array(inputs).fill(false));
  }
 export function emptyConnectionMaps(): ConnectionMap {
    return [new Map<string, boolean[][]>(), new Map<string, boolean[][]>()];
}
export function isNodeCtor(node: string): node is keyof AudioContext {
    return ['Oscillator', 'BufferSource', 'MediaStreamSource', 'Analyser', 'MediaStreamDestination', 'Panner', 'DynamicsCompressor', 'Convolver', 'ChannelMerger', 'ChannelSplitter', 'Delay', 'Gain', 'BiquadFilter', 'WaveShaper', 'IIRFilter'].includes(node);
  }
  export function isAudioParamKey<TNode extends AudioNode>(param: keyof TNode, node: TNode): param is keyof TNode {
    return (param in node);
  }
  export function isAudioParam(param: AudioParam): param is AudioParam {
    if(param instanceof AudioParam) return true;
    return false;
  }
export function isNodeMap(str: string): str is keyof AudioService {
    return ['source', 'sink_nodes', 'mixer_nodes', 'simple_nodes', 'effect_nodes', 'device_nodes'].includes(`${str}_nodes`);
  }
export function getNodeMap(map_str: string): keyof AudioService {
    if(!isNodeMap(map_str)) throw new Error('invalid node map '+map_str);
    return `${map_str}_nodes` as keyof AudioService;
}
  export function getNodeKind(ids: Map<string, NodeKind>, id: string): NodeKind {
    let kind = ids.get(id);
    if(!kind) throw new Error(`source node with id ${id} does not exist or has improper kind ${kind}`);
    return kind;
  }
  export function getNode(this: AudioService, id: string, kind?: NodeKind): AudioNode {
    kind ??= getNodeKind(this.node_ids, id);
    let nodeObject = (this[getNodeMap(kind)] as Map<string, AudioNode>).get(id);
    if(!nodeObject) throw new Error('node with id '+id+' does not exist');
    return nodeObject;
  }
export function getConnectionMaps(connections: Map<string, ConnectionMap>, src_id: string, connect = true): ConnectionMap {
    let maps = connections.get(src_id);
    if(!maps && !connect) throw new Error('source node '+src_id+' does not have any connections');
    return maps ?? emptyConnectionMaps();
}
export function getConnectionMatrix(outputMap: Map<string, boolean[][]>, src_id: string, tgt_id: string, outputs: number, inputs: number, connect = true): boolean[][] {
    let matrix = outputMap.get(tgt_id);
      if(!matrix && !connect) throw new Error('source node '+src_id+' is not connected to target node '+tgt_id);
      return matrix ?? emptyConnectionMatrix(outputs, inputs);
}
