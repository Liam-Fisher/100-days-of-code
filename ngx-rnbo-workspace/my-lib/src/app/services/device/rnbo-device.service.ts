import { Injectable, inject, signal } from '@angular/core';
import { NgxDevice } from '../../types/device';
import { BeatTimeEvent, MIDIData, MIDIEvent, MessageEvent, TempoEvent, TimeSignatureEvent, TransportEvent } from '@rnbo/js';

import { AudioService } from '../audio/audio.service';
import { NgxPatcher } from '../../types/patcher';
import { load } from './helpers/load';

@Injectable()
export class RnboDeviceService {
  sig = signal<NgxDevice|null>(null);
  audio = inject(AudioService);
  isLoaded = signal<boolean>(false);
  load: (id: string, p: string|NgxPatcher) => Promise<void> = load.bind(this);
  constructor() { }
  
  scheduleMessage(tag: string, payload: number[], time = 0) {
    this.sig()?.scheduleEvent(new MessageEvent(time, tag, payload));
}
  scheduleMidiEvent(data: number[], time = 0, port = 0) {
    this.sig()?.scheduleEvent(new MIDIEvent(time, port, data as MIDIData));
  }
  scheduleBeatTimeChange(beatTime: number, time = 0) {  
    this.sig()?.scheduleEvent(new BeatTimeEvent(time, beatTime));
  }
  scheduleTransportChange(transport: 0|1, time = 0) {
    this.sig()?.scheduleEvent(new TransportEvent(time, transport));
  }
  scheduleTimeSignatureChange(beatsPerMeasure: number, beatUnit: number, time = 0) {
    this.sig()?.scheduleEvent(new TimeSignatureEvent(time, beatsPerMeasure, beatUnit));
  }
  scheduleTempoChange(tempo: number, time = 0) {
    this.sig()?.scheduleEvent(new TempoEvent(time, tempo));
  }

}
