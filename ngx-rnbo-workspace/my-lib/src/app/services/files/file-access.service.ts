
import { Injectable, Injector, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {  INgxBufferInfo,  INgxFileRequest, INgxPatcherInfo, INgxPresetInfo, NgxFileInfoJson } from '../../types/files';
import { NgxPatcher } from '../../types/patcher';
import { NgxPreset } from '../../types/preset';
import { effectCtor } from './helpers/effectCtro';
import { HttpClient } from '@angular/common/http';


@Injectable({
  'providedIn': 'root'
})
export class FileAccessService {

  //folder = signal<string>('./assets');
  //fileInfoName = signal<string>('fileList');
  //fileInfoPath = computed<string>(() => `${this.folder()}/${this.fileInfoName()}.json`);
  
  //fileInfo = signal<FileInfo|null>(null);
  readonly assetsFolder = './assets/';
  readonly fileInfoName = 'examples/fileList';
  effectCtor = effectCtor.bind(this);
  http = inject(HttpClient);
  injector = inject(Injector);
  inputFileInfo = signal<NgxFileInfoJson|null>(null);
  loadedFileInfo = toSignal(this.http.get<NgxFileInfoJson>(`${this.assetsFolder}${this.fileInfoName}.json`));
  fileInfo = computed<NgxFileInfoJson|null>(() => this.inputFileInfo()??this.loadedFileInfo()??null);

  loadError = signal<any>(null);
  patchers = computed<INgxPatcherInfo[]>(() => this.fileInfo()?.patcher??[]);
  buffers = computed<INgxBufferInfo[]>(() => this.fileInfo()?.buffer??[]);
  presets = computed<INgxPresetInfo[]>(() => this.fileInfo()?.preset??[]);  
  
  patcherSelection = signal<INgxPatcherInfo|null>(null);
  bufferSelection = signal<INgxBufferInfo|null>(null);
  presetSelection = signal<INgxPresetInfo|null>(null);

  activePatcherFile = signal<NgxPatcher|null>(null);
  activeBufferFile = signal<Blob|null>(null);
  activePresetFile = signal<NgxPreset|null>(null);

  patcherRequest = signal<INgxFileRequest<"patcher">>(null);
  bufferRequest = signal<INgxFileRequest<"buffer">>(null);
  presetRequest = signal<INgxFileRequest<"preset">>(null);

  patcherNames = computed<string[]>(() => this.patchers().map(p => p.name));
  bufferNames = computed<string[]>(() => this.buffers().map(b => b.name));
  presetNames = computed<string[]>(() => this.presets().map(p => p.name));

  patcherPresets = computed<string[]>(() => this.patcherSelection()?.presets??[]); 
  filteredPresetNames = computed<string[]>(() => this.presetNames().filter(n => this.patcherPresets()?.includes(n)));

  loadPatcherEffect = this.effectCtor('patcher', this.patcherNames, this.patcherSelection, this.activePatcherFile, this.patcherRequest);
  loadBufferEffect = this.effectCtor('buffer', this.bufferNames, this.bufferSelection, this.activeBufferFile, this.bufferRequest);
  loadPresetEffect = this.effectCtor('preset', this.presetNames, this.presetSelection, this.activePresetFile, this.presetRequest);

  constructor() { }
  
}
