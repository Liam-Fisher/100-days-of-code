import { AudioService } from '../audio/audio.service';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { NgxBuffer } from './helpers/ngxbuffer';
import { NgxDevice } from '../../types/device';
import { Injectable, computed, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';


@Injectable()
export class RnboBufferService {
  audio = inject(AudioService);
  selectedBufferFile = signal<string>('');
  bufferFileOptions = signal<string[]>([]);
  buffers = computed<Map<string, NgxBuffer>>(() => {
    return new Map(
    this.device.bufferRefs()
    .map(ref => [ref.id, new NgxBuffer(ref, this.audio.context)])
    );
  }); 
  selectedBufferId = signal<string>('');
  bufferIds = computed<string[]>(() => Array.from(this.buffers().keys()).filter(id => !(this.buffers().get(id)?.hidden)));
  currentBuffer = computed<NgxBuffer|null>(() => this.buffers().get(this.selectedBufferId())??null);
  isLoading = new BehaviorSubject<boolean>(false);
  constructor(public device: RnboDeviceService) { }
  async loadAll() {
    for await (let buffer of this.buffers().values()) {
      this.loadBuffer(buffer?.url);
    }
  }
  async loadBuffer(data?: string|Blob|Float32Array[]|File|null) {
    this.isLoading.next(true);
    let id = this.selectedBufferId();
    let buffer = this.buffers().get(id);
    if(typeof data === 'string') {
      await buffer?.setAudioFromUrl(data);
    }
    else if(data instanceof Blob) {
      await buffer?.setAudioFromFile(this.selectedBufferFile(), data);
    }
    else if(data instanceof File){
      await buffer?.setAudioFromFile(data.name, data);
    }
    else if(Array.isArray(data)) {
      await buffer?.setAudioFromData(data);
    }
    else if(data === null) {
      buffer?.setAudioToNull();
    }
    else {
      await buffer?.setAudioFromDataBuffer(await this.device.getDataBuffer(id)); 
    }
    this.device.setAudioBuffer(id, buffer?.buffer??null);
    this.isLoading.next(false);
  }
}
