import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxPatcher } from '../../types/patcher';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgxPreset } from '../../types/preset';
interface FileList {
  patchers: {
    folder: string;
    files: string[];
  };
  buffers: {
    folder: string;
    files: string[];
  };
  presets: {
    folder: string;
    files: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class FileInputService {


  
  http = inject(HttpClient);
  fileListFolder = signal<string>('./assets/fileList.json'); // this should be injected ??
  fileList = toSignal(this.http.get<FileList>(this.fileListFolder()));

  patcherFolder = computed<string>(() => this.fileList()?.patchers.folder??'');
  bufferFolder = computed<string>(() => this.fileList()?.buffers.folder??'');
  presetFolder = computed<string>(() => this.fileList()?.presets.folder??'');

  patcherOptions = computed<string[]>(() => this.fileList()?.patchers.files??[]);
  bufferOptions = computed<string[]>(() => this.fileList()?.buffers.files??[]);
  presetOptions = computed<string[]>(() => this.fileList()?.presets.files??[]);

  patcherSelection = signal<string>('');
  bufferSelection = signal<string>('');
  presetSelection = signal<string>('');

  

  constructor() { }
  async getPatcherFile(id: string) {
      if(!this.patcherOptions().includes(id)) throw new Error(`patcher ${id} not in patcher options`);
      let path = `${this.patcherFolder()}${id}.export.json`;
      console.log(`getting patcher from ${path}`);
      return this.http.get<NgxPatcher>(path);
    };

  async getPresetFile(id: string) {
      if(!this.presetOptions().includes(id)) throw new Error(`preset ${id} not in preset options`);
      let path = `${this.presetFolder()}${id}.json`;
      console.log(`getting preset from ${path}`);
      return this.http.get<NgxPreset>(path);
    };

  async getBufferFile(id: string) {
      if(!this.bufferOptions().includes(id)) throw new Error(`buffer ${id} not in buffer options`);
      let path = `${this.bufferFolder()}${id}.wav`;
      return this.http.get(path, { 'responseType': 'arraybuffer' });
    };

}

