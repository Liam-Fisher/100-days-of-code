import { Injectable, signal } from '@angular/core';
import { NgxDevice } from '../../types/device';
import { BeatTimeEvent, MIDIData, MIDIEvent, TempoEvent, TimeSignatureEvent, TransportEvent } from '@rnbo/js';

@Injectable()
export class RnboDeviceService {
  device = signal<NgxDevice|null>(null);

  constructor() { }

  scheduleMidiEvent(data: number[], time = 0, port = 0) {
    this.device()?.scheduleEvent(new MIDIEvent(time, port, data as MIDIData));
  }
  scheduleBeatTimeChange(beatTime: number, time = 0) {  
    this.device()?.scheduleEvent(new BeatTimeEvent(time, beatTime));
  }
  scheduleTransportChange(transport: 0|1, time = 0) {
    this.device()?.scheduleEvent(new TransportEvent(time, transport));
  }
  scheduleTimeSignatureChange(beatsPerMeasure: number, beatUnit: number, time = 0) {
    this.device()?.scheduleEvent(new TimeSignatureEvent(time, beatsPerMeasure, beatUnit));
  }
  scheduleTempoChange(tempo: number, time = 0) {
    this.device()?.scheduleEvent(new TempoEvent(time, tempo));
  }

}
