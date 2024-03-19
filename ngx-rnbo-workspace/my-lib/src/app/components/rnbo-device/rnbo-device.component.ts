import { Component, EffectRef, Input, computed, effect, inject, input, model, signal } from '@angular/core';
import { AudioService } from '../../services/audio/audio.service';
import { RnboDeviceService } from '../../services/device/rnbo-device.service';
import { NgxPatcher } from '../../types/patcher';
import { PresetAction } from '../../types/preset';
import { Subject } from 'rxjs';
import { PortMessage } from '../../types/messaging';
import { TimingMesssage } from '../../types/timing';
import * as audioSig from '../../services/audio/signals';
import { AudioControlPanelComponent } from '../audio/audio-control-panel/audio-control-panel.component';

@Component({
  selector: 'ngx-rnbo-device',
  standalone: true,
  providers: [AudioService, RnboDeviceService],
  imports: [AudioControlPanelComponent],
  template: `
    <ngx-audio-control-panel></ngx-audio-control-panel>
  `,
  styles: ``
})
export class RnboDeviceComponent {
  audio = inject(AudioService);
  // was having trouble using a signal for this... but let's try it again
  audioCtx =  input<AudioContext|null>(null); // the audio context 
  ctxChange = effect(() => {
    this.audio.initContext(this.audioCtx());
  });
  audioInputGain = audioSig.gain_in; // the input gain node
  audioOutputGain = audioSig.gain_out; // the output gain node
  
  device = inject(RnboDeviceService);
  deviceNode = computed(() => this.device.device()?.node??null);

   
  /// think we're going to get these from the preset component using queries 

  // presetIndex = model<number>(0);
  // presetSelection = model<string>(''); // a consumer can select a preset by name or index, or listen to user selection and load the preset 

  // presetIDs = computed(() => Array.from(this.presetService.ids()??[]));


  patcherList = input<string[]>([]);
  patcher = input<string|NgxPatcher|null>(null);
  patcherSelection = model<string>(''); // a consumer can select a patcher by name or index, or listen to user selection and load the patcher

  messageInput = new Subject<PortMessage>(); // message to the device, we'll pipe this to the top-level messaging component 
  messsageOutput = new Subject<PortMessage>(); // message from the device, we'll listen to the top-level messaging component to get these

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
  set audioContext(ctx: AudioContext) {
    this.audio.initContext(ctx);
  }
  setInputGain(gain: number) {
    this.audio.setInputGain(gain);
  }

}