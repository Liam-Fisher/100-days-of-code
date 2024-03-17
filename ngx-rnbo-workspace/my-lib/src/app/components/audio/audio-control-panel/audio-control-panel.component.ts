import { Component, inject } from '@angular/core';
import { AudioService } from '../../../services/audio/audio.service';
import { RnboDeviceService } from '../../../services/device/rnbo-device.service';
import { from } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-audio-control-panel',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [AudioService, RnboDeviceService],
  template: `
  
  <button (click)="loadContext()">load</button>
  <p>is loaded: {{audioService.isLoaded()}}</p>
  <button (click)="doTest()">test</button>
  <button (click)="log()">log</button>
  <input type="range" min="0" max="1" step="0.001" [formControl]="gainInControl" />
  <input type="range" min="0" max="1" step="0.001" [formControl]="gainOutControl" />
  `,
  styles: ``
})
export class AudioControlPanelComponent {
  audioService = inject(AudioService);
  deviceService = inject(RnboDeviceService);
  testNode!: OscillatorNode;
  gainInControl = new FormControl(0);
  gainOutControl = new FormControl(0);
  
  
  constructor() { 
    this.gainInControl.valueChanges.subscribe((value) => {
      if(value !== null) {
      }
    });
    this.gainOutControl.valueChanges.subscribe((value) => {
      if(value !== null) {
        let normalizeGain = this.audioService.normalizeGain(value);
        console.log(`output gain changed to: ${normalizeGain}`);
        this.audioService.setOutputGain(normalizeGain);
        
      }
    });

  }
  log() {
    console.log(`gain node value`, this.audioService.gain_out_value);
  }
  loadContext() {
    this.audioService.createAudioContext(null);
  }
  doTest(){
    if(this.audioService.loadedContext === null) return;
    this.audioService.routeOut();
    this.testNode = this.audioService.loadedContext.createOscillator();
    
    this.testNode.type = "sawtooth";
    this.testNode.frequency.setValueAtTime(220, this.audioService.loadedContext.currentTime); // value in hertz
    this.audioService.linkGainIO(this.testNode);
    this.testNode.start();
  }
}
