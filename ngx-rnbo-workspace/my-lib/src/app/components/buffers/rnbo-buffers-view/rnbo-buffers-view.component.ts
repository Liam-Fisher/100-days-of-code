import { Component, computed, effect, inject, viewChild } from '@angular/core';
import { RnboBufferService } from '../../../services/buffers/rnbo-buffer-service.service';
import { BufferSelectComponent } from '../buffer-select/buffer-select.component';
import { BufferWaveformDisplayComponent } from '../waveform-display/waveform-display.component';
import { WaveformChannelSelectComponent } from '../waveform-channel-select/waveform-channel-select.component';
import { BufferUrlInputComponent } from '../buffer-url-input/buffer-url-input.component';
import { NgxBuffer } from '../../../services/buffers/helpers/ngxbuffer';

@Component({
  selector: 'ngx-rnbo-buffers-view',
  standalone: true,
  imports: [BufferSelectComponent, BufferWaveformDisplayComponent, WaveformChannelSelectComponent, BufferUrlInputComponent],
  template: `
    <h1>Buffers</h1>
    <ngx-buffer-select [refs]="buffers.refs()"></ngx-buffer-select>
    <ngx-buffer-url-input ></ngx-buffer-url-input>
    <ngx-waveform-channel-select [buffer]="activeBuffer()"></ngx-waveform-channel-select>
    <ngx-buffer-waveform-display [inputData]="activeChannel()" [(dirty)]="dirty"></ngx-buffer-waveform-display>
  `,
  styles: ``
})
export class RnboBuffersViewComponent {
  buffers = inject(RnboBufferService);
  idSelectElement= viewChild.required(BufferSelectComponent);
  urlInputElement = viewChild.required(BufferUrlInputComponent);
  channelSelectElement = viewChild.required(WaveformChannelSelectComponent);
  waveformDisplayElement = viewChild.required(BufferWaveformDisplayComponent);

  id = computed(() => this.idSelectElement().id());
  url = computed(() => this.urlInputElement().url());
  channel = computed(() => this.channelSelectElement().index());
  dirty = false;
  activeBuffer = computed<NgxBuffer|null>(() => this.buffers.map.get(this.id())??null);
  numChannels = computed(() => this.activeBuffer()?.channels??0);
  activeChannel = computed<Float32Array|null>(() => this.activeBuffer()?.readChan(this.channel())??null);

  changedChannel = effect(() => {
    if(this.activeChannel()) {
      this.dirty = true;
    }
  });
  
  logChanges = effect(() => {
    console.log(`logging changes in buffers view: id: ${this.id()}, url: ${this.url()}, channel: ${this.channel()}`);
  });
}
