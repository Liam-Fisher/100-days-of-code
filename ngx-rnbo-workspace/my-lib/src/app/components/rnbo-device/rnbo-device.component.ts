import { Component,  Injector, effect, inject, input } from '@angular/core';
import { AudioService } from '../../services/audio/audio.service';
import { RnboDeviceService } from '../../services/device/rnbo-device.service';
import { NgxPatcher } from '../../types/patcher';
import { PresetAction } from '../../types/preset';
import { BehaviorSubject, Subject } from 'rxjs';
import {  PortMessage } from '../../types/messaging';
import { TimingMesssage } from '../../types/timing';
import { AudioControlPanelComponent } from '../audio/audio-control-panel/audio-control-panel.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { RnboParametersService } from '../../services/parameters/rnbo-parameters.service';
import { RnboParametersViewComponent } from '../parameters/rnbo-parameters-view.component';
import { RnboBufferService } from '../../services/buffers/rnbo-buffer-service.service';
import { RnboBuffersViewComponent } from '../buffers/rnbo-buffers-view/rnbo-buffers-view.component';
import { RnboMessagingService } from '../../services/messaging/rnbo-messaging.service';
import { RnboMessagingViewComponent } from '../messaging/rnbo-messaging-view/rnbo-messaging-view.component';


@Component({
  selector: 'ngx-rnbo-device',
  standalone: true,
  providers: [AudioService, RnboDeviceService, RnboBufferService, RnboMessagingService, RnboParametersService],
  imports: [
    ReactiveFormsModule, 
    AudioControlPanelComponent,
    RnboParametersViewComponent,
    RnboBuffersViewComponent,
    RnboMessagingViewComponent
  ],
  template: `
  <ngx-audio-control-panel></ngx-audio-control-panel>
  <ngx-rnbo-parameters-view></ngx-rnbo-parameters-view>
  <ngx-rnbo-messaging-view></ngx-rnbo-messaging-view>
  
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
  parameters = inject(RnboParametersService);
 
  inputContext = input<AudioContext|null>(null);  
  contextChange = effect(() =>  this.audio.context = this.inputContext() ?? new AudioContext());   

  patcherInput = input.required<NgxPatcher>();

  loadDeviceOnUserInteraction = effect(() => {
    if(this.audio.isReady()) {
        this.device.load('untitled', this.patcherInput());
    }
  }, {allowSignalWrites: true});

  /// think we're going to get these from the preset component using queries 

  // presetIndex = model<number>(0);
  // presetSelection = model<string>(''); // a consumer can select a preset by name or index, or listen to user selection and load the preset 

  // presetIDs = computed(() => Array.from(this.presetService.ids()??[]));

  
  


  // will this work with signals?
  //messageInput = input<PortMessage>(); // the message input channel
    
  // we'll pipe these to the device service
  
  midiInput = new Subject<number[]>(); // the midi input channel
  midiOutput = new Subject<number[]>(); // the midi output channel

  presetInput = new Subject<PresetAction>(); // the preset input channel
  
  //  presetIDs = computed<string[]>(() => this.deviceService.presetIDs); // the preset ids
  // ?? do this instead of an input event??
  // presetSelection = model<string>(''); // a consumer can select a preset by name or index, or listen to user selection and load the preset

  timingInput = new Subject<TimingMesssage>(); // the timing input channel


  // Still need Buffer and Parameter attributes.
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
  
}
