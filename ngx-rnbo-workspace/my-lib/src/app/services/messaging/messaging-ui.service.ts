import { Injectable, computed, effect, model } from '@angular/core';
import { RnboMessagingService } from './rnbo-messaging.service';
import { NgxPortInfo } from '../../types/messaging';

@Injectable()
export class MessagingUiService {
  private displayMode_in = model<boolean>(false);
  private displayMode_out = model<boolean>(false);
  private time_in = model<number>(0);
  private time_out = model<number>(0);
  private port_in = model<NgxPortInfo|null>(null);
  private port_out = model<NgxPortInfo|null>(null);
  tag_in = computed<string>(() => this.port_in()?.tag??'');
  tag_out = computed<string>(() => this.port_out()?.tag??'');
  private payload_in = model<number[]>([]);
  private payload_out = model<number[]>([]);

  inportInfoMap!: Map<string, NgxPortInfo>; // Reference to RnboMessagingService.inportInfoMap
  outportInfoMap!: Map<string, NgxPortInfo>; // Reference to RnboMessagingService.outportInfoMap

  constructor(public messaging: RnboMessagingService) {
      this.inportInfoMap = messaging.inportInfoMap;
      this.outportInfoMap = messaging.outportInfoMap;
  }
  getDisplayMode(portType: 'in'|'out') {
    return portType==='in'?this.displayMode_in:this.displayMode_out;
  }
  getPorts(portType: 'in'|'out') {
    return portType==='in'?[...this.inportInfoMap.values()]:[...this.outportInfoMap.values()];
  }
  getPort(portType: 'in'|'out') {
    return portType==='in'?this.port_in:this.port_out;
  }
  getTag(portType: 'in'|'out') {
    return portType==='in'?this.tag_in:this.tag_out;
  }
  getPayload(portType: 'in'|'out') {
    return portType==='in'?this.payload_in:this.payload_out;
  }
  getTime(portType: 'in'|'out') {
    return portType==='in'?this.time_in:this.time_out;
  }
  setTime(portType: 'in'|'out', value: number) {
    portType==='in'?this.time_in.set(value):this.time_out.set(value);
  }
  timeNum(timeValue: string|number|null) {
    let str = parseInt(timeValue+'');
    return isNaN(str)?0:str;
  }
}
