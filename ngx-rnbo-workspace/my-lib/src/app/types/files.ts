import { WritableSignal } from "@angular/core";
import { NgxPatcher } from "./patcher";
import { BehaviorSubject } from "rxjs";
import { NgxPreset } from "./preset";

export enum NgxFileTypeName {
  "patcher" = "patcher",
  "buffer" = "buffer",
  "preset" = "preset"
}
export type NgxFileTypeNames = keyof typeof NgxFileTypeName;
export enum NgxDefaultFileExtensions {
  "patcher" = "export.json",
  "buffer" = "wav",
  "preset" = "json"
}
export interface INgxFileInfo {
  "name": string;
  "isLocal": boolean;
  "path": string[];
  "info": string;
  "size"?: string;
  "created"?: string;
  "modified"?: string;
  "extension"?: string;
  "format"?: "json"|"arraybuffer"|"blob"|"text";
}

export interface INgxFileTypeInfo {
  "name": NgxFileTypeName;
  "isLocal"?: boolean;
  "fileNames": string[];
  "format"?: "json"|"arraybuffer"|"blob"|"text";
  "extension"?: string;
}

export interface INgxPatcherInfo extends INgxFileInfo {
  "presets"?: string[];
}
export interface INgxBufferInfo extends INgxFileInfo {
}
export interface INgxPresetInfo extends INgxFileInfo {
}
export type INgxFileInfoInterfaces = {
  "patcher": INgxPatcherInfo,
  "buffer": INgxBufferInfo,
  "preset": INgxPresetInfo
}
export type NgxFileInfo<T extends NgxFileTypeNames> = INgxFileInfoInterfaces[T]|null;

export type NgxFileInfoJson = { "localFolder": string; } & {
  [key in keyof INgxFileInfoInterfaces]: INgxFileInfoInterfaces[key][]
};

export type NgxFileTypes = {
  "patcher": NgxPatcher,
  "buffer": Blob,
  "preset": NgxPreset
}
export type NgxFile<T extends NgxFileTypeNames> = null|NgxFileTypes[T];
export type INgxFileRequest<TFile extends NgxFileTypeNames> = null|{
  "filetype": TFile;
  "path": string;
  "info": INgxFileInfoInterfaces[TFile];
}

export type NgxFileSelection<T extends NgxFileTypeNames> = WritableSignal<NgxFileInfo<T>>;
export type NgxActiveFile<T extends NgxFileTypeNames> = WritableSignal<NgxFile<T>>;
export type NgxFileRequest<T extends NgxFileTypeNames> = WritableSignal<INgxFileRequest<T>>;
//export type NgxActiveFile<T extends NgxFileTypeNames> = BehaviorSubject<NgxFile<T>>;
//export type NgxFileRequest<T extends NgxFileTypeNames> = BehaviorSubject<INgxFileRequest<T>|null>;