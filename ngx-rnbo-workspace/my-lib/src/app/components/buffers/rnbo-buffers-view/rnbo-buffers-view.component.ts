import { Component, computed, inject } from '@angular/core';
import { RnboBufferService } from '../../../services/buffers/rnbo-buffer-service.service';
import { BufferSelectComponent } from '../buffer-select/buffer-select.component';
import { BufferWaveformDisplayComponent } from '../waveform-display/waveform-display.component';
import { WaveformChannelSelectComponent } from '../waveform-channel-select/waveform-channel-select.component';
import { BufferUrlInputComponent } from '../buffer-url-input/buffer-url-input.component';

@Component({
  selector: 'ngx-rnbo-buffers-view',
  standalone: true,
  imports: [BufferSelectComponent, BufferWaveformDisplayComponent, WaveformChannelSelectComponent, BufferUrlInputComponent],
  template: `
    <h1>Buffers</h1>
    <ngx-buffer-select></ngx-buffer-select>
    <ngx-buffer-url-input></ngx-buffer-url-input>
    <ngx-waveform-channel-select></ngx-waveform-channel-select>
    <ngx-buffer-waveform-display></ngx-buffer-waveform-display>
  `,
  styles: ``
})
export class RnboBuffersViewComponent {
  bufferService = inject(RnboBufferService);

  
}
