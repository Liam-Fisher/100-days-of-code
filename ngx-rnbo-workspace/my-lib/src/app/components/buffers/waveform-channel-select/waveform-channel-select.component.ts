import { Component, computed, effect, inject, input, model, untracked } from '@angular/core';
import { RnboBufferService } from '../../../services/buffers/rnbo-buffer-service.service';
import { NgxBuffer } from '../../../services/buffers/helpers/ngxbuffer';

@Component({
  selector: 'ngx-waveform-channel-select',
  standalone: true,
  imports: [],
  template: `
  <div>
    <button (click)="buffer()?.incrementChannel()">+</button>
    <span>{{channelIndex()}}/{{numChannels()}}</span>
    <button (click)="buffer()?.decrementChannel()">-</button>
  </div>
  `,
  styles: ``
})
export class WaveformChannelSelectComponent {
    buffer = input<NgxBuffer|null>();
    channelIndex = computed<number>(() => this.buffer()?.selectedChannelIndex()??1);
    numChannels = computed<number>(() => this.buffer()?.channels??1);
}
