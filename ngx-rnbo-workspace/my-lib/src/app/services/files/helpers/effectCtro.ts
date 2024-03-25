import { Signal, effect, untracked } from '@angular/core';
import {
    INgxFileRequest,
  NgxActiveFile,
  NgxDefaultFileExtensions,
  NgxFile,
  NgxFileRequest,
  NgxFileSelection,
  NgxFileTypeNames,
  NgxFileTypes,
} from '../../../types/files';
import { FileAccessService } from '../file-access.service';
import { BehaviorSubject } from 'rxjs';

export function effectCtor<TFile extends NgxFileTypeNames>(
  this: FileAccessService,
  filetype: TFile,
  options: Signal<string[]>,
  selection: NgxFileSelection<TFile>,
  target: NgxActiveFile<TFile>, 
  request: NgxFileRequest<TFile>,
) {
  return effect(
    () => {
      try {
        let info = selection();
        let names = untracked(options);
        if (!info ) {
            throw new Error(`no ${filetype} selected`);
        }
        if(!names.includes(info.name)) {
            throw new Error(`no ${filetype} named ${info.name}`);
        }
        let extension = info?.extension || NgxDefaultFileExtensions[filetype];
        if (info?.isLocal) {
          let path = `./assets/${filetype}/${info.path.join('/')}.${
            NgxDefaultFileExtensions[filetype]
          }`;
          this.http
            .get<NgxFile<TFile>>(path, { responseType: info?.format??'json' } as unknown as any)
            .subscribe((data: any) => target.set(data  as unknown as NgxFile<TFile>));
        } else {
          let path = `${info.path.join('/')}.${
            NgxDefaultFileExtensions[filetype]
          }`;
          request.set({ filetype, path, info });
        }
      } catch (e) {
        this.loadError.set(e);
        console.log(e);
      }
    },
    { allowSignalWrites: true, injector: this.injector }
  );
}
