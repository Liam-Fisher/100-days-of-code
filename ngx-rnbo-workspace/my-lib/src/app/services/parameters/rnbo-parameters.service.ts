import { EffectRef, Injectable, Injector, WritableSignal, computed, effect } from '@angular/core';
import { INgxParameter, ParameterAddress } from '../../types/parameter';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { NgxParameter } from './helpers/ngxparameter';
import { BehaviorSubject, Subscription } from 'rxjs';
import { displayNameLabel, instanceDescriptor } from './helpers/labels';
import { IEventSubscription } from '@rnbo/js';
import { bindToSignal, bindToSubject } from './helpers/bindings';

@Injectable({
  providedIn: 'root'
})
export class RnboParametersService {

  addresses = computed<ParameterAddress[]>(() => this.device.sig()?.parameters.map(p => p.address)??[]);
  ids = computed<string[]>(() => this.addresses().map(a => a.id));
  optionGroups = computed(() => this.addresses().map(a => [a.index+'', ...a.id.split('/')].map(el => el.toLowerCase())));
  grouped = computed<string[][]>(() => this.ids().map((id, index) => ['#'+index, ...id.split('/')]));
  subjectParameterSubscriptions = new Map<string, Subscription>();
  parameterSubjectSubscriptions = new Map<string, IEventSubscription>();
  signalParameterSubscriptions = new Map<string, EffectRef>();
  parameterSignalSubscriptions = new Map<string, IEventSubscription>();
  ngxParametersById = new Map<string, NgxParameter>(); // keep track of instantiated parameters

  bindToSignal: (id: string, signal: WritableSignal<number>) => void = bindToSignal.bind(this);
  bindToSubject: (id: string, subject: BehaviorSubject<number>, normalizedSubject?: boolean) => void = bindToSubject.bind(this);
  displayNameLabel: (a: ParameterAddress) => string = displayNameLabel.bind(this);
  instanceDescriptor: (a: ParameterAddress|null) => string = instanceDescriptor.bind(this);

  constructor(public device: RnboDeviceService, public injector: Injector) { 
    effect(() => {
      this.reset();
      this.ngxParametersById.clear();
      device.sig()?.parameters.forEach(p => {
        const param = new NgxParameter(p);
        param.linkControl();
        this.ngxParametersById.set(p.address.id, param);
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
  reset() {
    this.ngxParametersById.clear();
    this.subjectParameterSubscriptions.forEach(ref => ref.unsubscribe());
    this.subjectParameterSubscriptions.clear();
    this.parameterSubjectSubscriptions.forEach(ref => ref.unsubscribe());
    this.parameterSubjectSubscriptions.clear();
  }
  remove(id: string) {
    this.subjectParameterSubscriptions.get(id)?.unsubscribe();
    this.subjectParameterSubscriptions.delete(id);
    this.parameterSignalSubscriptions.get(id)?.unsubscribe();
    this.parameterSignalSubscriptions.delete(id);
    this.parameterSubjectSubscriptions.get(id)?.unsubscribe();
    this.parameterSubjectSubscriptions.delete(id);
    this.signalParameterSubscriptions.get(id)?.destroy();
    this.signalParameterSubscriptions.delete(id);
    this.ngxParametersById.delete(id);
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
