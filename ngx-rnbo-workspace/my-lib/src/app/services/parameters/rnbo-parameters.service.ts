import {  Injectable,   computed, effect, inject } from '@angular/core';
import { INgxParameter, ParameterAddress } from '../../types/parameter';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { NgxParameter } from './helpers/ngxparameter';
import { BehaviorSubject, Subscription } from 'rxjs';
import { displayNameLabel, instanceDescriptor } from './helpers/labels';

@Injectable({
  providedIn: 'root'
})
export class RnboParametersService {
  
  

  addresses = computed<ParameterAddress[]>(() => this.device.parameters().map(p => p.address));
  ids = computed<string[]>(() => this.addresses().map(a => a.id));
  optionGroups = computed(() => this.addresses().map(a => [a.index+'', ...a.id.split('/')].map(el => el.toLowerCase())));
  grouped = computed<string[][]>(() => this.ids().map((id, index) => ['#'+index, ...id.split('/')]));
  
  ngxParametersById = new Map<string, NgxParameter>(); // keep track of instantiated parameters

  displayNameLabel: (a: ParameterAddress) => string = displayNameLabel.bind(this);
  instanceDescriptor: (a: ParameterAddress|null) => string = instanceDescriptor.bind(this);
  

  constructor(public device: RnboDeviceService) { 
    effect(() => {
      this.cleanup();
      this.device.parameters().forEach(p => this.ngxParametersById.set(p.address.id, (new NgxParameter(p))));
    }, {allowSignalWrites: true});
  }
  cleanup() {
    this.ngxParametersById.forEach(p => p.unlinkControl()?.unlinkExternalSubjects());
    this.ngxParametersById.clear();
  }
  remove(id: string) {
    this.ngxParametersById.get(id)?.unlinkControl()?.unlinkExternalSubjects();  
    this.ngxParametersById.delete(id);
  }
  linkSubject(id: string, subject: BehaviorSubject<number>, normalized = false) {
    if(!this.ngxParametersById.has(id)) {
      throw new Error(`parameter ${id} not found`);
    }
    return this.ngxParametersById.get(id)!.linkExternalSubject(subject, normalized);
  }
  getSubject(id: string): BehaviorSubject<number>|null { 
    return this.ngxParametersById.get(id)?.inputSubject??null;
  }
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
}
