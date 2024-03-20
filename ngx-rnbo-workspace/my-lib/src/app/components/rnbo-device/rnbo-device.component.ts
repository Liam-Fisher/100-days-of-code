import { Component, EventEmitter, effect, inject, input, output, signal, untracked } from '@angular/core';
import { AudioService } from '../../services/audio/audio.service';
import { RnboDeviceService } from '../../services/device/rnbo-device.service';
import { NgxPatcher } from '../../types/patcher';
import { PresetAction } from '../../types/preset';
import { Subject } from 'rxjs';
import { IPortMessage, PortMessage } from '../../types/messaging';
import { TimingMesssage } from '../../types/timing';
import { AudioControlPanelComponent } from '../audio/audio-control-panel/audio-control-panel.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RnboMessagingService } from '../../services/messaging/rnbo-messaging-service.service';
import { RnboParametersService } from '../../services/parameters/rnbo-parameters.service';
import { RnboParametersViewComponent } from '../parameters/rnbo-parameters-view.component';

@Component({
  selector: 'ngx-rnbo-device',
  standalone: true,
  providers: [
    {
      provide: AudioService,
      useClass: AudioService
    },
    {
      provide: RnboDeviceService,
      useClass: RnboDeviceService
    },
    {
      provide: RnboMessagingService,
      useFactory: () => new RnboMessagingService(inject(RnboDeviceService)),
      deps: [RnboDeviceService]
    },
    {
      provide: RnboParametersService,
      useFactory: () => new RnboParametersService(inject(RnboDeviceService)),
      deps: [RnboDeviceService]
    }
  ],
  imports: [
    ReactiveFormsModule, 
    AudioControlPanelComponent,
    RnboParametersViewComponent
  ],
  template: `
    <ngx-audio-control-panel></ngx-audio-control-panel>
  
    <select #selectPatcher [formControl]="patcherSelectionControl">
  @for (item of patcherList(); track $index) {
    <option [value]="item">{{item}}</option>
  }
  </select>
  <ngx-rnbo-parameters-view></ngx-rnbo-parameters-view>
  `,
  styles: ``
})
export class RnboDeviceComponent {
  // loading events

  audio = inject(AudioService);
  // was having trouble using a signal for this... but let's try it again
  customAudioContext =  input<AudioContext|null>(null); // the audio context 
  ctxChange = effect(() =>  this.audio.context = this.customAudioContext() ?? new AudioContext());
  device = inject(RnboDeviceService);
   
  /// think we're going to get these from the preset component using queries 

  // presetIndex = model<number>(0);
  // presetSelection = model<string>(''); // a consumer can select a preset by name or index, or listen to user selection and load the preset 

  // presetIDs = computed(() => Array.from(this.presetService.ids()??[]));


  
  patcherList = input<string[]>([]);
  // patcherSelection = model<string>(''); // a consumer can select a patcher by name or index, or listen to user selection and load the patcher
  patcherSelectionControl = new FormControl('', {nonNullable: true});
  
  // a consumer can select a patcher by name or index, or listen to user selection and load the patcher
  patcherSelectionChange = this.patcherSelectionControl.valueChanges.subscribe((id: string) => {
    console.log('patcher selection change', id);
      if(this.patcherList().includes(id)) {
        this.audio.isLoaded.set(true);
        this.patcherSelectionSignal.set(id);
        this.patcherSelectionEvent.emit(id);
      }
      else {
        console.log(`patcher ${id} not found`);
        console.log('patcher list', this.patcherList());
      }
  });

  patcherSelectionSignal = signal<string>('untitled');
  patcherSelectionEvent = new EventEmitter<string>();
  patcher = input<string|NgxPatcher|null>(null);

    // here's the atepmted signal version
/* 
  // patcherSelection = model<string>(''); // a consumer can select a patcher by name or index, or listen to user selection and load the patcher
  loadAudioOnPatcherSelection = effect(() => {
    let id = this.patcherSelection();
    let patcherList = this.patcherList();
      if(patcherList.includes(id)) {
        this.audio.isLoaded.set(true);
      }
  }, {allowSignalWrites: true});
 */
  loadDeviceOnUserInteraction = effect(() => {
    console.log('loading device on user interaction');
    if(this.audio.isLoaded()) {
      let p = this.patcher();
      let id = untracked(this.patcherSelectionSignal);
        if(p) {
          this.device.load(id, p);
        }
      }
  }, {allowSignalWrites: true});

  messaging = inject(RnboMessagingService);

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
  set inputMessage(m: PortMessage|IPortMessage) {
    if(Array.isArray(m)) {
      this.messaging.inport.next(m);
    }
    else {
      this.messaging.input = m;
    }
  }
  get outputMessage() {
    return this.messaging.outport;
  }
}
