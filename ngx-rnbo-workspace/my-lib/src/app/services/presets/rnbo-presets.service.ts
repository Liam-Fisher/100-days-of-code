import { Injectable, computed, effect, inject, signal, untracked } from '@angular/core';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { PresetAction, PresetMap } from '../../types/preset';
import { IEventSubscription, IPreset } from '@rnbo/js';
import { BehaviorSubject, from } from 'rxjs';
import { createPreset, deletePreset, loadPreset, updatePreset } from './helpers/presetActions';
import { presetAction } from '../../helpers/commands';

@Injectable()
export class RnboPresetsService {
  device = inject(RnboDeviceService);
  debug = computed<boolean>(() => this.device.debugMode()?.presets??false);
  map = new Map<string, IPreset>();
  selectedId = signal<string>('');
  ids = computed<string[]>(() => [...this.device.presetIds()]);
  newId = computed<boolean>(() => !this.map.has(this.selectedId()));
  selectedPreset = computed<IPreset|null>(() => this.map.get(this.selectedId())??null);
  
  isDirty = signal<boolean>(false);
  $isDirty?: IEventSubscription;

  isLoaded = signal<boolean>(false);
  
  init = effect(() => {
    const device = this.device.sig();
    if(!device) return;
    this.$isDirty = this.device.sig()?.presetTouchedEvent
    .subscribe(() => this.isDirty.set(true));
    this.map = device.meta.presets;
    
  }, {allowSignalWrites: true});

  create = createPreset.bind(this);
  update = updatePreset.bind(this);
  load = loadPreset.bind(this);
  delete = deletePreset.bind(this);

  command = presetAction.bind(this);
  commandInput = new BehaviorSubject<PresetAction|null>(null);
  $commandInput = this.commandInput.subscribe(action => this.command(action));
  constructor() { }
  cleanup() {
    this.$isDirty?.unsubscribe();
    this.map.clear();
  }
  changeSelection(id: string) {
    if(id === this.selectedId()) return false;
    this.selectedId.set(id);
    this.isLoaded.set(false);
    return true;
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

  
}
