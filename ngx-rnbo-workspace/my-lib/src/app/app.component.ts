import { Component, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RnboDeviceComponent } from './components/rnbo-device/rnbo-device.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as test from './examplePatchers/feature_test_mono.export.json';
import { NgxPatcher } from './types/patcher';
import { BehaviorSubject } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IdSelectComponent } from './components/generic/id-select/id-select.component';
import { WaveformChannelSelectComponent } from './components/buffers/waveform-channel-select/waveform-channel-select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RnboDeviceComponent, HttpClientModule, ReactiveFormsModule, WaveformChannelSelectComponent],
  providers: [HttpClient],
  template: `
  <h1> my lib </h1>
  <button (click)="testParameterSubjectBinding()">bind to subject</button>
  
  <select #enum [formControl]="testParameterFormControl">
  @for (item of ["n", "p", "w"]; track $index) {
    <option [value]="$index">{{item}}</option>
  }
  </select>
  
  
  <ngx-rnbo-device #device [patcher]="testPatcher()" [patcherList]="fileNames()" (patcherSelectionChange)="getFile($event)" ></ngx-rnbo-device> 
  `
})
export class AppComponent {
title = 'my-lib';
activeDevice = viewChild(RnboDeviceComponent);
testPatcher = signal<NgxPatcher>(test as unknown as NgxPatcher); 
fileNames = signal<string[]>([
  'iter_test',
  'loop',
  'metaTest',
  'feature_test_mono'
]);
http = inject(HttpClient);  
testParameterSubject = new BehaviorSubject<number>(0);
testParameterFormControl = new FormControl<number>(0, {nonNullable: true});
constructor() { }
postChannel(num: number) {
  console.log(`channel selected: ${num}`);
}
patcherSelected(name: string) {
  console.log(`patcher selected: ${name}`);
}
getFile(name: any) {
  let path = `./assets/${name as string}.export.json`;
  console.log(`getting file from ${path}`);
  this.http.get<NgxPatcher>(path).subscribe((data) => {
      this.testPatcher.set(data);
    }); 
  }
  
  testParameterSubjectBinding() {
    
    const subScript = this.testParameterSubject?.subscribe((v: number) => {
      let currentValue = this.testParameterFormControl.value;
      if(v !== currentValue) {
        this.testParameterFormControl.setValue(v);
      }
    });
    const formScript = this.testParameterFormControl.valueChanges.subscribe((v: number) => {
      let currentValue = this.testParameterSubject?.value;
      if(v !== currentValue) {
        this.testParameterSubject.next(v);
      }
    });
    
    this.activeDevice()?.linkParameterSubject('noiseSelect', this.testParameterSubject);

  }

}
