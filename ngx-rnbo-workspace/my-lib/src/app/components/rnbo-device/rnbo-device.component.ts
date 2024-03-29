import { Component,  Injector, effect, inject, input } from '@angular/core';
import { AudioService } from '../../services/audio/audio.service';
import { RnboDeviceService } from '../../services/device/rnbo-device.service';
import { NgxPatcher } from '../../types/patcher';
import { BehaviorSubject, Subject } from 'rxjs';
import {  PortMessage } from '../../types/messaging';
import { AudioControlPanelComponent } from '../audio/audio-control-panel/audio-control-panel.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { RnboParametersService } from '../../services/parameters/rnbo-parameters.service';
import { RnboParametersViewComponent } from '../parameters/rnbo-parameters-view.component';
import { RnboBufferService } from '../../services/buffers/rnbo-buffer-service.service';
import { RnboBuffersViewComponent } from '../buffers/rnbo-buffers-view/rnbo-buffers-view.component';
import { RnboMessagingService } from '../../services/messaging/rnbo-messaging.service';
import { RnboMessagingViewComponent } from '../messaging/rnbo-messaging-view/rnbo-messaging-view.component';
import { RnboMidiService } from '../../services/midi/rnbo-midi.service';
import { RnboPresetsService } from '../../services/presets/rnbo-presets.service';
import { RnboTimingService } from '../../services/timing/timing.service';
import { RnboPresetsViewComponent } from '../presets/rnbo-presets-view/rnbo-presets-view.component';
import { RnboTimingViewComponent } from '../timing/rnbo-timing-view/rnbo-timing-view.component';


@Component({
  selector: 'ngx-rnbo-device',
  standalone: true,
  providers: [AudioService, RnboDeviceService, RnboBufferService, RnboMessagingService,RnboMidiService, RnboParametersService,RnboPresetsService, RnboTimingService],
  imports: [
    ReactiveFormsModule, 
    AudioControlPanelComponent,
    RnboParametersViewComponent,
    RnboBuffersViewComponent,
    RnboMessagingViewComponent,
    RnboPresetsViewComponent,
    RnboTimingViewComponent
  ],
  template: `
  <ngx-audio-control-panel></ngx-audio-control-panel>
  <button (click)="doTest()">Test</button>
  `,
  styles: ``
})
export class RnboDeviceComponent {
  // loading events
  audio = inject(AudioService);
  injector = inject(Injector);
  device = inject(RnboDeviceService);
  buffer = inject(RnboBufferService);
  messaging = inject(RnboMessagingService);
  midi = inject(RnboMidiService);
  parameters = inject(RnboParametersService);
  presets = inject(RnboPresetsService);
  timing = inject(RnboTimingService);
  
  inputContext = input<AudioContext|null>(null);  
  contextChange = effect(() =>  this.audio.context = this.inputContext() ?? new AudioContext());   

  patcherInput = input.required<NgxPatcher>();

  loadDeviceOnUserInteraction = effect(() => {
    if(this.audio.isReady()) { 
      this.device.load('untitled', this.patcherInput());
    }
  }, {allowSignalWrites: true});

  constructor() { }
  set inputGain(gain: number) {
    this.audio.setInputGain(gain);
  }
  set outputGain(gain: number) {
    this.audio.setOutputGain(gain);
  }
  linkInportSubject(subject: BehaviorSubject<PortMessage>) {
    return this.messaging.connectExternalSubjectToInport(subject);
  }
  linkOutportSubject(subject: BehaviorSubject<PortMessage>) {
    return this.messaging.connectOuportToExternalSubject(subject);
  }
  linkParameterSubject(id: string, subject: BehaviorSubject<number>) {
    return this.parameters.linkSubject(id, subject);
  }
  linkMIDIInputSubject(subject: BehaviorSubject<number[]>) {
    return this.midi.connectExternalSubjectToInput(subject);
  }
  linkMIDIOutputSubject(subject: BehaviorSubject<number[]>) {
    return this.midi.connectOuportToExternalSubject(subject);
  }
doTest() {
  this.midi.addInput(0);
}
}
