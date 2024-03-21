
import { NgxDevice } from '../../types/device';
import { MessageEvent, MIDIEvent, BeatTimeEvent, TransportEvent, TimeSignatureEvent, TempoEvent , MIDIData} from '@rnbo/js';
import { AudioService } from '../audio/audio.service';
import { NgxPatcher } from '../../types/patcher';
import { load } from './helpers/load';
import { TaggedDataRef } from '../../types/buffers';
import { Injectable, computed, inject, signal } from '@angular/core';

@Injectable()
export class RnboDeviceService {
  sig = signal<NgxDevice|null>(null);
  audio = inject(AudioService);
  isLoaded = signal<boolean>(false);
  bufferRefs = computed<TaggedDataRef[]>(() => (this.sig()?.dataBufferDescriptions??[]) as TaggedDataRef[]);
  load: (id: string, p: string|NgxPatcher) => Promise<void> = load.bind(this);
  constructor() { }
  async getDataBuffer(id: string) {
    return (await this.sig()?.releaseDataBuffer(id))??null;
  }
  async setAudioBuffer(id: string, buffer: AudioBuffer|null) {
    if(!buffer) return;
    await this.sig()?.setDataBuffer(id, buffer);
  }
  scheduleMessageEvent(time: number, tag: string, payload: number[]) {
    this.sig()?.scheduleEvent(new MessageEvent(time, tag, payload));
}
  scheduleMidiEvent(time: number, port = 0, data: number[]) {
    this.sig()?.scheduleEvent(new MIDIEvent(time, port, data as MIDIData));
  }
  scheduleBeatTimeChange(time: number, beatTime: number) {  
    this.sig()?.scheduleEvent(new BeatTimeEvent(time, beatTime));
  }
  scheduleTransportChange(time: number, transport: 0|1) {
    this.sig()?.scheduleEvent(new TransportEvent(time, transport));
  }
  scheduleTimeSignatureChange(time: number, beatsPerMeasure: number, beatUnit: number) {
    this.sig()?.scheduleEvent(new TimeSignatureEvent(time, beatsPerMeasure, beatUnit));
  }
  scheduleTempoChange(tempo: number, time = 0) {
    this.sig()?.scheduleEvent(new TempoEvent(time, tempo));
  }

}
