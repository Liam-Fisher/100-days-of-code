import { Component, computed, effect, inject, input } from '@angular/core';
import { AudioService } from '../../../services/audio/audio.service';
import { RnboDeviceService } from '../../../services/device/rnbo-device.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-audio-control-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  
  @if(audio.isReady())  {
    <input #ctx type="checkbox" [checked]="running()" name="pausePlayContext" (change)="toggleContext(ctx.checked ? 'running' : 'suspended')" />
    <label for="pausePlayContext">audio is {{state()}}</label>
  
  <div>
    <input name="inputGain" type="range" min="0" max="1" step="0.01" [formControl]="inputGainControl" />
    <label for="inputGain">Input Gain</label>
  </div>  
  <div>
    <input name="outputGain" type="range" min="0" max="1" step="0.01" [formControl]="outputGainControl" />
    <label for="outputGain">Output Gain</label>
  </div>
  }
  @else {
    <button (click)="loadContext()">{{audio.isReady()? 'reload': 'load'}}</button>
  }
  `,
  styles: ``
})
export class AudioControlPanelComponent {
  audio = inject(AudioService);
  state = computed(() => this.audio.state()??'closed');
  running = computed(() => this.state() === 'running');
  closed = computed(() => this.state() === 'closed');
  device = inject(RnboDeviceService);
  
  inputGainControl = new FormControl(0, {nonNullable: true});
  outputGainControl = new FormControl(0, {nonNullable: true});
  
  

  

  constructor() { 
    this.inputGainControl.valueChanges.subscribe((value) => {
      if(value !== null) {
        this.audio.setInputGain(value*0.99+0.0001);
      }
    });
    this.outputGainControl.valueChanges.subscribe((value) => {
      if(value !== null) {
        this.audio.setOutputGain(value*0.99+0.0001);
      }
    });
  }
  set inputGain(value: number) {
    this.inputGainControl.setValue(value);
  }
  set outputGain(value: number) {
    this.outputGainControl.setValue(value);
  }
  async toggleContext(state: 'running'|'suspended'|'closed') {
    await this.audio.setState(state);
  }
  async loadContext() {
    this.audio.isReady.set(true);
  }
}
