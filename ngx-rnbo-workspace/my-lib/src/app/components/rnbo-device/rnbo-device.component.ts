import { Component, EventEmitter, Injector, WritableSignal, computed, effect, inject, input, model, output, signal, untracked } from '@angular/core';
import { AudioService } from '../../services/audio/audio.service';
import { RnboDeviceService } from '../../services/device/rnbo-device.service';
import { NgxPatcher } from '../../types/patcher';
import { PresetAction } from '../../types/preset';
import { BehaviorSubject, Subject } from 'rxjs';
import { IPortMessage, PortMessage } from '../../types/messaging';
import { TimingMesssage } from '../../types/timing';
import { AudioControlPanelComponent } from '../audio/audio-control-panel/audio-control-panel.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RnboMessagingService } from '../../services/messaging/rnbo-messaging-service.service';
import { RnboParametersService } from '../../services/parameters/rnbo-parameters.service';
import { RnboParametersViewComponent } from '../parameters/rnbo-parameters-view.component';
import { RnboBufferService } from '../../services/buffers/rnbo-buffer-service.service';
import { IdSelectComponent } from '../generic/id-select/id-select.component';
import { BufferWaveformDisplayComponent } from '../buffers/waveform-display/waveform-display.component';
import { RnboBuffersViewComponent } from '../buffers/rnbo-buffers-view/rnbo-buffers-view.component';

@Component({
  selector: 'ngx-rnbo-device',
  standalone: true,
  providers: [
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
      useFactory: () => new RnboParametersService(inject(RnboDeviceService), inject(Injector)),
      deps: [RnboDeviceService]
    },
    {
      provide: RnboBufferService,
      useFactory: () => new RnboBufferService(inject(RnboDeviceService)),
      deps: [RnboDeviceService]
    }
  ],
  imports: [
    ReactiveFormsModule, 
    AudioControlPanelComponent,
    RnboParametersViewComponent,
    RnboBuffersViewComponent
    
    
  ],
  template: `
    <ngx-audio-control-panel></ngx-audio-control-panel>
<!-- move this to a new component at some point -->
    <select #selectPatcher [formControl]="patcherSelectionControl" >
  @for (item of patcherList(); track $index) {
    <option [value]="item">{{item}}</option>
  }
  </select> 
  <ngx-rnbo-buffers-view></ngx-rnbo-buffers-view>
  `,
  styles: ``
})
export class RnboDeviceComponent {
  // loading events
  injector = inject(Injector);
  audio = inject(AudioService);
  device = inject(RnboDeviceService);
  parameters = inject(RnboParametersService);
  // was having trouble using a signal for this... but let's try it again
  customAudioContext =  input<AudioContext|null>(null); // the audio context 
  ctxChange = effect(() =>  this.audio.context = this.customAudioContext() ?? new AudioContext());
  
   
  /// think we're going to get these from the preset component using queries 

  // presetIndex = model<number>(0);
  // presetSelection = model<string>(''); // a consumer can select a preset by name or index, or listen to user selection and load the preset 

  // presetIDs = computed(() => Array.from(this.presetService.ids()??[]));


  
  patcherList = input<string[]>([]);
  // patcherSelection = model<string>(''); // a consumer can select a patcher by name or index, or listen to user selection and load the patcher
  patcherSelectionControl = new FormControl('untitled', {nonNullable: true});
  patcherSelection = model<string>('');
  // a consumer can select a patcher by name or index, or listen to user selection and load the patcher
  patcherSelectionChangeSubscription = this.patcherSelectionControl.valueChanges.subscribe((id: string) => {
    console.log('patcher selection change', id);
    let patchers = this.patcherList();
    console.log('patcher list', patchers);
      if(patchers.includes(id)) {
        console.log(`loading patcher ${id}`);
        this.audio.isReady.set(true);
        this.patcherSelection.set(id);
      }
      else {
        console.log(`patcher ${id} not found`);
        console.log('patcher list', this.patcherList());
      }
  });

  patcher = input<string|NgxPatcher|null>(null);
  
  loadDeviceOnUserInteraction = effect(() => {
    if(this.audio.isReady()) {
        this.device.load(this.patcherSelectionControl.value, this.patcher());
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

  validSelection = computed<boolean>(() => this.patcherList().includes(this.patcherSelection()));

  

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
  linkParameterSubject(id: string, subject: BehaviorSubject<number>) {
    return this.parameters.linkSubject(id, subject);
  }
  async loadDevice(){
    if(this.device.isLoaded()) {
      await this.device.cleanup();
    }
    await this.device.load(this.patcherSelectionControl.value, this.patcher());
  }
  
}
