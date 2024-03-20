import { Injectable, computed, effect } from '@angular/core';
import { INgxParameter, ParameterAddress } from '../../types/parameter';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { NgxParameter } from './helpers/ngxparameter';

@Injectable({
  providedIn: 'root'
})
export class RnboParametersService {

  addresses = computed<ParameterAddress[]>(() => this.device.sig()?.parameters.map(p => p.address)??[]);
  ids = computed<string[]>(() => this.addresses().map(a => a.id));
  optionGroups = computed(() => this.addresses().map(a => [a.index+'', ...a.id.split('/')].map(el => el.toLowerCase())));
  grouped = computed<string[][]>(() => this.ids().map((id, index) => ['#'+index, ...id.split('/')]));
  ngxParametersById = new Map<string, NgxParameter>(); // keep track of instantiated parameters
  constructor(public device: RnboDeviceService) { 
    effect(() => {
      this.ngxParametersById.clear();
      device.sig()?.parameters.forEach(p => {
        this.ngxParametersById.set(p.address.id, new NgxParameter(p));
      });
    }, {allowSignalWrites: true});
  }/* 
  ngxParameterFactory(id: string): NgxParameter|null {
    let param = typeof id === 'string'?this.paramById(id):this.paramByIndex(id);
    return param?(new NgxParameter(param)):null; 
  }

  paramByIndex(paramIndex: number): INgxParameter|null {
    return this.device.sig()?.parameters[paramIndex]??null;
  } */
  byId(id: string): INgxParameter|null {
    return this.ngxParametersById.get(id)??null;
  }
  addressByIndex(paramIndex: number): ParameterAddress|null {
    return this.addresses()[paramIndex]??null;
  }
  displayName(param: INgxParameter|null) {
    return param?.address?.displayName??'';
  }
  formatFilter(value: string): string[] {
    return value.split(' ').map(v => v.toLowerCase());
  }
  subpatcherTree(address: ParameterAddress|null) {
    return address?.subpatchers.join('->')??'';
  }
  displayLabel(a: ParameterAddress) {
    let name = a.displayName;
    let subpatcherTree = this.subpatcherTree(a);
    let instance = this.instanceDescriptor(a);
    return `${instance}${subpatcherTree}${subpatcherTree.length?'::':''}${name}`;
  }
  instanceDescriptor(address: ParameterAddress|null) {
    if(!address) return '';
    let {instance, instances} = address;
    if(instance>0) return `#${instance} `; 
    if(instances.length) return `(${instances.length}) `;
    return '_';
  }
}
