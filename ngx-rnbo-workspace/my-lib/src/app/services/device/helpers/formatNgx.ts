import { IParameterDescription, IPreset } from "@rnbo/js";
import { NgxDevice } from "../../../types/device";
import { NgxParameter, SubpatcherNode } from "../../../types/parameter";
import { NgxPatcher } from "../../../types/patcher";

export function formatNgxDevice(p: NgxPatcher, device: NgxDevice) {
    device.meta = p.desc.meta;
    device.meta.patcherTree = formatParameters(device, p.desc.parameters);
    device.meta.hasMidiIn = !!p.desc.numMidiInputPorts;
    device.meta.hasMidiOut = !!p.desc.numMidiOutputPorts;
    device.meta.presets = new Map((p?.presets??[]).map(p => [p.name, p.preset])) as Map<string, IPreset>;
}

function formatParameters(device: NgxDevice, desc: IParameterDescription[]) {
    const root: SubpatcherNode = {
      parameterIndices: [],
      childNodes: []
    };
    const parameters = [...device.parametersById.values()];
    const ids = [...device.parametersById.keys()];
    
    for (let index = 0; index < parameters.length; index++) {
          let id = ids[index];
          let parameter: NgxParameter = parameters[index];
          let idParts: string[] = id.split('/');
      
          let instance = getIndex(idParts);
          let name: string = idParts[idParts.length - 1];
  
          let isInstance = instance !== -1;
          let isTopLevel = idParts.length === 1;
          let isPoly = idParts[0] === 'poly';
  
          let instances = isInstance?[]:getInstances(idParts, ids, isTopLevel);
          let isControl = instances.length > 0;
      
          let subpatchers = isTopLevel?[]:idParts.slice(+isPoly, -1 - (+isInstance));
          if(!isInstance) {
              addParameterToNode(root, subpatchers, index);
          }
      
          // here we add the data properties to the parameter object
          let pDesc = desc.find(d => d.paramId === id);
          if(pDesc) {
              let isSignal = desc.some(d => d.name === name && d.type === 'ParameterTypeSignal')??false;
              let [isDebug, isVisible, isEnum] = [pDesc.debug, pDesc.visible, pDesc.isEnum];
              parameter.flags = {isPoly, isControl, isInstance, isSignal, isEnum, isDebug, isVisible};
  
              let displayName = pDesc.displayName ? pDesc.displayName : name;
              parameter.address = {subpatchers, instances, name, displayName, index, instance, id};
              parameter.meta = (pDesc as any)?.meta ?? {}; // more meta data (like styling) can be added here
          }
      }
      return root;
  }
  function getIndex(idParts: string[]) {
      return idParts.map(id => +id).filter(id => !isNaN(id))?.[0] ?? -1;
  }
  function getInstances(idParts: string[], ids: string[], isTopLevel: boolean) {
      let name = idParts.at(-1);
      let parent = isTopLevel ? 'poly' : idParts.slice(0, -1).join('/');
      let instanceIndices = [];
      let hasInstances = true;
      let i = 1;
      while (hasInstances) {
          let instanceIndex = ids.indexOf(`${parent}/${i++}/${name}`);
          if (instanceIndex !== -1) {
              instanceIndices.push(instanceIndex);
          } else {
            hasInstances = false;
          }
        }
    return instanceIndices;
  }
  function addParameterToNode(root: SubpatcherNode, subpatchers: string[], index: number) {
      let currentNode = root;
      for(let sp of subpatchers) {
          let node = currentNode.childNodes.find(n => n.name === sp);
          if(!node) {
              node = {name: sp, parameterIndices: [], childNodes: []};
              currentNode.childNodes.push(node);
          }
          currentNode = node;
      }
      currentNode.parameterIndices.push(index);
  }