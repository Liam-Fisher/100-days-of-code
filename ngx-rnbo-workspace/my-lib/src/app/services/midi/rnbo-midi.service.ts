import { Injectable, computed, effect, inject, model, signal } from '@angular/core';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { BehaviorSubject, Subscription, filter, from, map, tap } from 'rxjs';
import { IEventSubscription, MIDIData, MIDIEvent } from '@rnbo/js';
import { NgxDevice } from '../../types/device';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable()
export class RnboMidiService {
  device = inject(RnboDeviceService);
  debugMode = computed<boolean>(() => this.device.debugMode()?.midi??false);
  access = signal<MIDIAccess|null>(null);
  hasInput = computed<boolean>(() => !!this.device.sig()?.numMIDIInputPorts);
  hasOutput = computed<boolean>(() => !!this.device.sig()?.numMIDIOutputPorts);
  inputs = signal<MIDIInput[]>([]);
  outputs = signal<MIDIOutput[]>([]);

  inputRouter = new BehaviorSubject<number[]>([]);
  outputRouter = new BehaviorSubject<number[]>([]);

  $inputRouter?: Subscription;
  $outputRouter?: IEventSubscription;

  externalInputSubscriptions: (Subscription|null)[] = new Array(16).fill(null);
  externalOutputSubscriptions: (Subscription|null)[] = new Array(16).fill(null);

  init = effect(() => {
    const device = this.device.sig();
    if(!device) return;
    this.getDevices();
    this.link(this.device.sig());
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
      if(this.debugMode()) console.log('input event', evt);
    });

    this.$outputRouter = device.midiEvent
      .subscribe(({port, data}) => {
        this.outputRouter.next([port, ...(data as number[])]);
        if(this.debugMode()) console.log('output event', {port, data});
    });
  }
  async getDevices() {
    const access = await navigator.requestMIDIAccess();
    if(!access) return;
    const inputs: MIDIInput[] = [];
    const outputs: MIDIOutput[] = [];
    access.inputs.forEach((input) => inputs.push(input));
    access.outputs.forEach((output) => outputs.push(output));
    this.access.set(access);
    this.inputs.set(inputs);
    this.outputs.set(outputs);
  }
  async addInput(index: number) {
    const midiinput = this.inputs()?.[index];
    if(!midiinput) return;
    await midiinput.open();
    midiinput.onmidimessage = (msg: any) => console.log((msg.data as Uint8Array).join(' '));
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
