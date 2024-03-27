import { AudioService } from '../audio/audio.service';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { NgxBuffer } from './helpers/ngxbuffer';
import { NgxDevice } from '../../types/device';
import { Injectable, computed, effect, inject } from '@angular/core';
import { BehaviorSubject, Subscription, from, map } from 'rxjs';
import { TaggedDataRef } from '../../types/buffers';


@Injectable()
export class RnboBufferService {
  audio = inject(AudioService);
  device = inject(RnboDeviceService);
  refs = computed(() => this.device.bufferRefs());
  map = new Map<string, NgxBuffer>();
  refsLoaded = new BehaviorSubject<boolean>(false);  
  $refsLoaded!: Subscription;
  init = effect(() => {
    this.$refsLoaded = this.cleanup().loadRefs(this.refs())
    .subscribe((v) => this.refsLoaded.next(v));
  });
  
  isLoading = new BehaviorSubject<boolean>(false);
  
  constructor() { }
  loadRefs(refs: TaggedDataRef[]) {

    let loaded: Promise<boolean>[] = [];

    for (let ref of refs) {

      let buffer = new NgxBuffer(ref, this.audio.context);
      if(this.map.has(ref.id)) {
        this.map.get(ref.id)?.setAudioToNull();
      }
      this.map.set(ref.id, buffer);
      loaded.push(this.loadBuffer(buffer, buffer?.url));
    }
    return from(Promise.all(loaded)).pipe(map((v: boolean[]) => v.every(el => el)));
  }
  cleanup() {
    for(let buffer of this.map.values()) {
      buffer?.setAudioToNull();
    }
    this.map.clear();
    return this;
  }
  async loadBuffer(buffer: NgxBuffer|null, data?: string|Blob|Float32Array[]|File|null) {
    this.isLoading.next(true);
    try {
        if(!buffer) throw new Error('Buffer not found');
        let id = buffer.id;
        let status = true;
        if(!this.map.has(id)) throw new Error(`Buffer id ${id} not in map`);
        if(typeof data === 'string') await buffer?.setAudioFromUrl(data);
        else if(data instanceof File) status = await buffer?.setAudioFromFile(data);
        else if(Array.isArray(data)) status = await buffer?.setAudioFromData(data);
        else if(data === null) status = buffer?.setAudioToNull();
        else status = await buffer?.setAudioFromDataBuffer(await this.device.getDataBuffer(id)); 
        if(!status) {
          console.log(`Buffer ${id} failed to load through designated method`);
          await buffer?.createEmpty(1,1);
        }
        if(buffer.srcType !== 'device') {
          status = await this.device.setAudioBuffer(id, buffer?.obj??null);
        }
        if(!status) {
          console.log(`Buffer ${id} failed to load into device`);
        }
        this.isLoading.next(false);
        return status;
    } catch (e) {
      console.error(e);
      this.isLoading.next(false);
      return false;
    }
  }

}
