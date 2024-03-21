import { ParameterAddress } from "../../../types/parameter";
import { RnboParametersService } from "../rnbo-parameters.service";

export function displayNameLabel(this: RnboParametersService, a: ParameterAddress) {
    let name = a.displayName;
    let subpatchers = this.subpatcherTree(a);
    let instance = this.instanceDescriptor(a);
    return `${instance}${subpatchers}${subpatchers.length?'::':''}${name}`;
  }
export function instanceDescriptor(address: ParameterAddress|null) {
    if(!address) return '';
    let {instance, instances} = address;
    if(instance>0) return `#${instance} `; 
    if(instances.length) return `(${instances.length}) `;
    return '_';
}