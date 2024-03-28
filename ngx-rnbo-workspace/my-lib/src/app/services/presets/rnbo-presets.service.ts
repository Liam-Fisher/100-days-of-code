import { Injectable, computed, effect, inject, signal, untracked } from '@angular/core';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { PresetAction, PresetMap } from '../../types/preset';
import { IEventSubscription, IPreset } from '@rnbo/js';
import { BehaviorSubject, from } from 'rxjs';

@Injectable()
export class RnboPresetsService {
  device = inject(RnboDeviceService);
  map = new Map<string, IPreset>();
  selectedId = signal<string>('');
  ids = computed<string[]>(() => [...this.device.presetIds()]);
  newId = computed<boolean>(() => !this.map.has(this.selectedId()));
  selectedPreset = computed<IPreset|null>(() => this.map.get(this.selectedId())??null);
  
  isDirty = signal<boolean>(false);
  isLoaded = signal<boolean>(false);
  $selectedPreset?: IEventSubscription;

  init = effect(() => {
    const device = this.device.sig();
    if(!device) return;
    this.$selectedPreset = this.device.sig()?.presetTouchedEvent
    .subscribe(() => this.isDirty.set(true));
    this.map = device.meta.presets;
    
  }, {allowSignalWrites: true});
  constructor() { 

  }
  cleanup() {
    this.$selectedPreset?.unsubscribe();
    this.map.clear();
  }
  changeSelection(id: string) {
    if(id !== this.selectedId()) {
      this.selectedId.set(id);
      this.isLoaded.set(false);
      return true;
    }
    return false;
  }
  async getPreset() {
      return (await this.device.sig()?.getPreset())??null;
  }
  setPreset(id: string, preset: IPreset|null) {
    if(!preset) return null;
    this.map.set(id, preset);
    this.isDirty.set(false);
    return preset;
  }
async createPreset() {
  let id = this.selectedId();
  if(!this.newId()) return `Preset ${id} already exists. Please select another id or update the existing preset.`;
  let preset = this.setPreset(id, await this.getPreset());
  if(!preset) return `Failed to get preset from device. Preset ${id} not created.`;
  this.isLoaded.set(false);
  return `New Preset ${id} created.`;
}
async updatePreset() {
  let id = this.selectedId();
  let preset = this.setPreset(id, await this.getPreset());
  if(preset) return `Preset ${id} updated.`;
  return `Failed to get preset from device. Preset ${id} not updated.`;
}
async loadPreset() {
  let preset = this.selectedPreset();
  if(!preset) return `Preset ${this.selectedId()} not found.`;
    this.device.sig()?.setPreset(preset);
    this.isLoaded.set(true);
    return `Preset ${this.selectedId()} loaded.`;
}
async deletePreset() {
  let id = this.selectedId();
  let removed = this.map.delete(this.selectedId());
  this.isLoaded.set(false);
  if(removed) return `Preset ${id} removed.`;
  return `Preset ${id} not found, nothing to remove.`;
}

command({type, id}: PresetAction) {
  this.changeSelection(id);
  try {
  switch(type) {
    case 'create':
      return from(this.createPreset());
    case 'update':
      return from(this.updatePreset());
    case 'load':
      return from(this.loadPreset());
    case 'delete':
      return from(this.deletePreset());
    default:
      return from(`Invalid command type ${type}.`);
    }
  }
  catch(e) {
    return from(`Error executing command: ${type} ${id}. ${e}`);
  }
}
  
}
