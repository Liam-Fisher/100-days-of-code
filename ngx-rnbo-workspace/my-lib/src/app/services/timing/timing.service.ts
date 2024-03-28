import { Injectable, effect, inject, model, signal, untracked } from '@angular/core';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { BeatTimeEvent, TempoEvent, TimeSignatureEvent, TransportEvent } from '@rnbo/js';
import { TimingMessage } from '../../types/timing';

@Injectable()
export class RnboTimingService {
  device = inject(RnboDeviceService);
  timingEventAt = signal<number>(0);
  beattime = model<number>(0);
  tempo = model<number>(0);
  timeSignature = model<[number, number]>([4,4]);
  transport = model<boolean>(false);


  $transport = effect(() => {
    let t = untracked(this.timingEventAt);
    let toggle = +this.transport(); 
    this.device.send(new TransportEvent(t, toggle))
  });
  $beattime = effect(() => {
    let t = untracked(this.timingEventAt);
    this.device.send(new BeatTimeEvent(t, this.beattime()))
  });
  $tempo = effect(() => {
    let t = untracked(this.timingEventAt);
    this.device.send(new TempoEvent(t, this.tempo()))
  });
  $timeSignature = effect(() => {
    let t = untracked(this.timingEventAt);
    let ts = this.timeSignature();
    this.device.send(new TimeSignatureEvent(t, ts[0], ts[1]))
  });
  constructor() { }

  timingEvent(evt: TimingMessage) {
    this.timingEventAt.set(evt?.timeTill??0);
    switch(evt?.type) {
      case 'beattime': this.beattime.set(evt?.data??0); break;
      case 'tempo': this.tempo.set(evt?.data??120); break;
      case 'timeSignature': this.timeSignature.set(evt?.data??[4, 4]); break;
      case 'transport': this.transport.set(evt?.data??false); break;
      default: 
        console.log(`Invalid timing event type`, evt);
        throw new Error(`Invalid timing event`);
      
  }
}
}
