import { Component, ElementRef, computed, effect, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RnboDeviceComponent } from './components/rnbo-device/rnbo-device.component';
import * as test from './examplePatchers/testing_buffers.export.json';
import { NgxPatcher } from './types/patcher';
import { BehaviorSubject } from 'rxjs';
import {  ReactiveFormsModule } from '@angular/forms';
import { PortMessage } from './types/messaging';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RnboDeviceComponent, ReactiveFormsModule],
  template: `
  <button (click)="testPortSubjectBinding()">test port subject binding</button>
  <ngx-rnbo-device #device [patcherInput]="testPatcher()"></ngx-rnbo-device> 
  
  `
})
export class AppComponent {
  // (patcherLoadRequest)="logOutputEvent('patcherLoadRequest', $event)"
title = 'my-lib';
activeDevice = viewChild(RnboDeviceComponent);
testPatcher = signal<NgxPatcher>(test as unknown as NgxPatcher); 
testInportSubject = new BehaviorSubject<PortMessage>([0, '', []]);

constructor() { 
}

logOutputEvent(src: string, event: any) {
  console.log(`output event: ${src}`, event);
}
  testPortSubjectBinding() {
  this.activeDevice()?.linkInportSubject(this.testInportSubject);
  this.testInportSubject.next([0, 'testInportMsg', [3,2,1]]);

  //  this.activeDevice()?.linkOutportSubject(this.testOutportSubject);
  }

}


/* 

inportNumberElement =  viewChild<ElementRef<HTMLInputElement>>('inportNumber');
inportTagElement = viewChild<ElementRef<HTMLInputElement>>('inportTag');
inportPayloadElement = viewChild<ElementRef<HTMLInputElement>>('inportPayload');

inportNumber = computed<string>(() => this.inportNumberElement()?.nativeElement?.value??'0');
inportPayloadTag = computed<string>(() => this.inportTagElement()?.nativeElement?.value??'');
inportPayloadNumbers = computed<number[]>(() => this.inportPayloadElement()?.nativeElement?.value.split(' ').map(el=>+el).filter(el => isNaN(el))??[]);
testInportMessage = computed<PortMessage>(() => [isNaN(+this.inportNumber())?+this.inportNumber():0, this.inportPayloadElement()?.nativeElement?.value??'', this.inportPayloadNumbers()]);


testInportSubject = new BehaviorSubject<PortMessage>([0, '', []]);

outportNumberElement =  viewChild<ElementRef<HTMLInputElement>>('inportNumber');
outportTagElement = viewChild<ElementRef<HTMLInputElement>>('inportTag');
outportPayloadElement = viewChild<ElementRef<HTMLInputElement>>('inportPayload');
outportNumber = computed<string>(() => this.outportNumberElement()?.nativeElement?.value??'0');
outportPayloadTag = computed<string>(() => this.outportTagElement()?.nativeElement?.value??'');
outportPayloadNumbers = computed<number[]>(() => this.outportPayloadElement()?.nativeElement?.value.split(' ').map(el=>+el).filter(el => isNaN(el))??[]);

testOutportSubject = new BehaviorSubject<PortMessage>([0, '', []]);
$testInportSubscription = this.testInportSubject.subscribe((message) => {
  console.log(`sending inport message: ${message}`);
});

$testOutportSubscription = this.testOutportSubject.subscribe((message) => {
  console.log(`received outport message: ${message}`);
  this.setOutport(message);
});

  sendInport() {
    this.testInportSubject.next(this.testInportMessage());
  }
  setOutport(message: PortMessage) {
    const outportNumber = this.outportNumberElement()?.nativeElement??null;
    const outportTag = this.outportTagElement()?.nativeElement??null;
    const outportPayload = this.outportPayloadElement()?.nativeElement??null;
    if(outportNumber && outportTag && outportPayload) {
      outportNumber.value = message.toString();
      outportTag.value = message.toString();
      outportPayload.value = message.toString();
    }
  }
linkSubjects = effect(() => {
  this.activeDevice()?.linkInportSubject(this.testInportSubject);
  this.activeDevice()?.linkOutportSubject(this.testOutportSubject);
}, {allowSignalWrites: true});
 */

/* 
<h2> Messaging</h2>
  <h3> Input </h3>
  <div>
  <input #inputNumber type="text" />
  <input #inputTag type="text" />
  <input #inputPayload type="text" />

  <input  type="button" (click)="sendInport()" value="send inport" />
  </div>

  <h3> Outport </h3>
  <div>
  <input #outputNumber type="text" />
  <input #outputTag type="text" />
  <input #outputPayload type="text" />
  </div> */