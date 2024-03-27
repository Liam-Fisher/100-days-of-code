import { Component, computed, effect, inject, input, model, untracked } from '@angular/core';
import { RnboBufferService } from '../../../services/buffers/rnbo-buffer-service.service';
import { NgxBuffer } from '../../../services/buffers/helpers/ngxbuffer';

@Component({
  selector: 'ngx-waveform-channel-select',
  standalone: true,
  imports: [],
  template: `
  <div>
    <button (click)="incrementChannel()">+</button>
    <span>{{indexDisplay()}}/{{numChannels()}}</span>
    <button (click)="decrementChannel()">-</button>
  </div>
  `,
  styles: ``
})
export class WaveformChannelSelectComponent {
    buffer = input<NgxBuffer|null>(null);
    numChannels = computed(() => this.buffer()?.channels??0);
    index = model<number>(0);
    indexDisplay = computed(() => this.numChannels()?this.index()+1:0);
    constructor() { }
    incrementChannel() {
      this.index.update((v) => Math.min(this.numChannels(), v+1));
    }
    decrementChannel() {
      this.index.update((v) => Math.max(1, v-1));
    }
}
