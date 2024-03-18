import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RnboDeviceComponent } from './components/rnbo-device/rnbo-device.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RnboDeviceComponent],
  template: `
  <h1> my lib </h1>
  <ngx-rnbo-device [audioCtx]="ctx"></ngx-rnbo-device>
  `
})
export class AppComponent {
title = 'my-lib';
ctx = new AudioContext();
constructor() { }

}
