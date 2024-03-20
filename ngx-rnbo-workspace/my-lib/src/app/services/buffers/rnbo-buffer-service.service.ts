import { Injectable, computed, inject, signal } from '@angular/core';
import { AudioService } from '../audio/audio.service';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { BufferStorage, HiddenRefStorage, TaggedDataRef } from '../../types/buffers';
import { NgxBuffer } from './helpers/ngxbuffer';
import { NgxDevice } from '../../types/device';


@Injectable()
export class RnboBufferService {
  audio = inject(AudioService);
  selectedBuffer = signal<string>('');
  buffers = computed<Map<string, NgxBuffer>>(() => {
    return new Map(
    this.device.bufferRefs()
    .map(ref => [ref.id, new NgxBuffer(ref, this.audio.context)])
    );
  }); 
  constructor(public device: RnboDeviceService) { }
  async load() {
    for await (let buffer of this.buffers().values()) {



    }
  }
}
