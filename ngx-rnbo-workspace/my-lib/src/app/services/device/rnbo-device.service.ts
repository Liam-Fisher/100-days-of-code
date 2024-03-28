
import { NgxDevice } from '../../types/device';
import { MessageEvent, MIDIEvent, BeatTimeEvent, TransportEvent, TimeSignatureEvent, TempoEvent , MIDIData, Event} from '@rnbo/js';
import { AudioService } from '../audio/audio.service';
import { NgxPatcher } from '../../types/patcher';
import { load } from './helpers/load';
import { TaggedDataRef } from '../../types/buffers';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RnboDeviceService {
  audio = inject(AudioService);
  sig = signal<NgxDevice|null>(null); 
  isLoaded = signal<boolean>(false); 
  bufferRefs = computed<TaggedDataRef[]>(() => (this.sig()?.dataBufferDescriptions??[]) as TaggedDataRef[]);
  load: (id: string, p: string|NgxPatcher|null) => Promise<void> = load.bind(this);
  parameters = computed(() => this.sig()?.parameters??[]);

  constructor() {

   }
  async getDataBuffer(id: string) {
    return (await this.sig()?.releaseDataBuffer(id))??null;
  }
  async setAudioBuffer(id: string, buffer: AudioBuffer|null) {
    if(!buffer) return false;
    await this.sig()?.setDataBuffer(id, buffer);
    return true;
  }
  send(event: Event) {
    this.sig()?.scheduleEvent(event);
  }
  sendMessage(tag: string, payload: number[]) {
    this.send(new MessageEvent(0, tag, payload));
  }
  sendMIDI(port: number, data: MIDIData) {
    this.send(new MIDIEvent(0, port, data));
  }

}
