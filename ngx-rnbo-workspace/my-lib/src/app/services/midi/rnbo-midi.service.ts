import { Injectable, effect, inject, model, signal } from '@angular/core';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { BehaviorSubject, Subscription, filter, map, tap } from 'rxjs';
import { IEventSubscription, MIDIData, MIDIEvent } from '@rnbo/js';
import { NgxDevice } from '../../types/device';
import { PortMessage } from '../../types/messaging';

@Injectable()
export class RnboMidiService {
  device = inject(RnboDeviceService);
  logEvents = false;
  inputRouter = new BehaviorSubject<number[]>([]);
  outputRouter = new BehaviorSubject<number[]>([]);

  $inputRouter?: Subscription;
  $outputRouter?: IEventSubscription;

  externalInputSubscriptions: (Subscription|null)[] = new Array(16).fill(null);
  externalOutputSubscriptions: (Subscription|null)[] = new Array(16).fill(null);

  linkEffect = effect(() => {
    this.link(this.device.sig())
  });
  constructor() { }
  link(device: NgxDevice|null) {
    if(device === null) return;
    this.cleanup();
    this.$inputRouter = this.inputRouter.pipe(
      filter(data => data.length > 1),
      map(([port, ...data]) => new MIDIEvent(0, port, data as MIDIData))
    ) .subscribe(evt => {
      device.scheduleEvent(evt);
      if(this.logEvents) console.log('input event', evt);
    });

    this.$outputRouter = device.midiEvent
      .subscribe(({port, data}) => {
        this.outputRouter.next([port, ...(data as number[])]);
        if(this.logEvents) console.log('output event', {port, data});
    });
  }
  
  connectExternalSubjectToInput(subject: BehaviorSubject<number[]>) {
    this.externalInputSubscriptions.push(
      subject.subscribe((msg) => this.inputRouter.next(msg))
      );
    return subject;
  }
  connectOuportToExternalSubject(subject: BehaviorSubject<number[]>) {
    this.externalOutputSubscriptions.push(
      this.outputRouter.subscribe((msg) => subject.next(msg)));
  }
  cleanup() {
    this.$inputRouter?.unsubscribe();
    this.$outputRouter?.unsubscribe();
    this.externalInputSubscriptions.forEach(sub => sub?.unsubscribe());
    this.externalOutputSubscriptions.forEach(sub => sub?.unsubscribe());
  }
}
