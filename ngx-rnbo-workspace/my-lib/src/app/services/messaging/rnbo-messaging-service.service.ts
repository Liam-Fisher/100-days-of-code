import { Injectable, NgZone } from '@angular/core';

import * as RNBO from '@rnbo/js';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { IPortMessage, NgxPortInfo, PortMessage } from '../../types/messaging';
//type PType = [string, number[]];

@Injectable()
export class RnboMessagingService {
  debug = true;
  inport = new BehaviorSubject<PortMessage>([ 0, '',[]]);
  inportSubscription?: Subscription;
  outport= new BehaviorSubject<PortMessage>([0, '', []]);
  outportSubscription?: RNBO.IEventSubscription;
  inportMap: Map<string, NgxPortInfo> = new Map();
  outportMap: Map<string, NgxPortInfo> = new Map();
  // TODO??
  // messageBacklog: Map<string, number[]> = new Map();
  constructor(public device: RnboDeviceService) {
    console.log('rnbo messaging service created');
  }
  get inports() {
    return this.device.sig()?.inports ?? [];
  }
  get outports() {
    return this.device.sig()?.outports ?? [];
  }
  set input({tag, payload, time}: IPortMessage) {
    if(tag) {
      this.inport.next([time??0, tag, this.toArray(payload)]);
    }
  }
  set output({tag, payload, time}: IPortMessage) {
    if(tag) {
      this.outport.next([time??0, tag, this.toArray(payload)]);
    }
  }
  fromString(data: string): number[] {
    return data.split(' ').map(el=>+el).filter(el => isNaN(el));
  }
  toArray(data?: string|number|number[]): number[] {
    if(Array.isArray(data)) return data;
    if(typeof data === 'number') return [data];
    if(typeof data === 'string') return this.fromString(data);
    return [];
  }
  link() {
    this.inportMap.clear();
    this.inports.forEach((p: NgxPortInfo) => this.inportMap.set(p.tag, p));    
    this.inportSubscription?.unsubscribe();
    this.inportSubscription = this.inport.subscribe(([time, tag, payload]: PortMessage) => {
      if(tag) { // empty string tags are not allowed, and will be ignored
        this.device.scheduleMessageEvent(time, tag, this.toArray(payload));
      }
      if(this.debug){
        console.log(`sending to ${tag}: ${payload}`);
      }
    });

    this.outportMap.clear();
    this.outports.forEach((p: NgxPortInfo) => this.inportMap.set(p.tag, p));    
    this.outportSubscription?.unsubscribe();
    this.outportSubscription = this.device.sig()?.messageEvent.subscribe((e: RNBO.MessageEvent) => {
      if(e.tag) {
        this.output = e;
      }
      if(this.debug){
        console.log(`output`, e);
      }
    });
}
}