import { ConnectionMap, connection } from "../../types/audio/web-audio-api";
import { WebAudioApiService } from "../web-audio-api.service";

export function addNode<T extends AudioNode>(
  tgt: WebAudioApiService,
  id: string,
  node: T,
  connections?: ConnectionMap
) {
    tgt.nodes.set(id, node);
    if (!connections) {
       node.connect(tgt.dac);
    } 
    else {
      if (connections?.sources) {
        makeConnections(tgt.nodes, node, true, connections.sources);
      }
      if (connections?.sinks) {
        makeConnections(tgt.nodes, node, false, connections.sinks);
      }
    }
}

export function routeOut<T extends AudioNode>(ctx: AudioContext, tgtNode: T) {
    if (tgtNode.numberOfOutputs > 0) {
      tgtNode.connect(ctx.destination);
    }
}
    
export function makeConnections<T extends AudioNode>(
    nodes: Map<string, AudioNode>,
    newNode: T,
    isInput: boolean,
    map?: connection
  ) {
    for (let nodeID in map) {
      let existingNode = nodes.get(nodeID);
      let connections = map[nodeID];
      if (!existingNode) {
        throw new Error(`node with ID ${nodeID} specified in source map does not exist`);
      }
      validateConnections(
        isInput ? existingNode : newNode,
        isInput ? newNode : existingNode,
        connections
      );
      (isInput ? newNode : existingNode).connect(
        isInput ? existingNode : newNode,
        ...connections
      );
    }
  }
  export function validateConnections(
    srcNode: AudioNode,
    tgtNode: AudioNode,
    io: [number?, number?]
  ) {
    if (srcNode.numberOfOutputs <= (io?.[0] ?? -1)) {
      throw new Error(`output ${io?.[0]} does not exist`);
    }
    if (tgtNode.numberOfInputs <= (io?.[1] ?? -1)) {
      throw new Error(`input ${io?.[1]} does not exist`);
    }
    return true;
  }