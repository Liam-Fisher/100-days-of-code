import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RnboDeviceComponent } from './components/rnbo-device/rnbo-device.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as test from './examplePatchers/loop.export.json';
import { NgxPatcher } from './types/patcher';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RnboDeviceComponent, HttpClientModule],
  providers: [HttpClient],
  template: `
  <h1> my lib </h1>
  <ngx-rnbo-device [patcher]="testPatcher" [patcherList]="fileNames()" ></ngx-rnbo-device>
  `
})
export class AppComponent {
title = 'my-lib';
testPatcher = test as unknown as NgxPatcher; 
fileNames = signal<string[]>([
  'featureTesting',
  'iter_test',
  'loop',
  'metaTest'
]);
http = inject(HttpClient);  
constructor() { }

getFile(name: string) {
  this.http.get<NgxPatcher>(`./assets/${name}.export.json`).subscribe((data) => {
    this.testPatcher = data;
    }); 
  }
}
