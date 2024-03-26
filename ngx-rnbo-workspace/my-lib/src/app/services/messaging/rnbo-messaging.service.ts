import { Injectable, computed, effect, inject, input, signal } from '@angular/core';
import { IPortMessage, NgxPortInfo, PortMessage } from '../../types/messaging';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { IEventSubscription, IMessageEvent, MessageEvent } from '@rnbo/js';
import { RnboDeviceService } from '../device/rnbo-device.service';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RnboMessagingService {
  debug = true;
 device = inject(RnboDeviceService);
  
  inportInfoMap = new Map<string, NgxPortInfo>();
  inportRouter = new BehaviorSubject<PortMessage>([0, '', []]);
  $inportRouter?: Subscription;
  
  $inportTagSubscription?: Subscription;
  $inportPayloadSubscription?: Subscription;

  externalInportSubscriptions: Subscription[] = [];

  outportRouter = new BehaviorSubject<PortMessage>([0, '', []]);
  $outportRouter?: IEventSubscription;
  outportInfoMap = new Map<string, NgxPortInfo>();
  externalOutportSubscriptions: Subscription[] = [];

  inports = computed<NgxPortInfo[]>(() => this.device.sig()?.inports??[]);
  outports = computed<NgxPortInfo[]>(() => this.device.sig()?.outports??[]);
  reset = effect(() => {
    if(this.device.sig()) {
      this.cleanup().linkDevice();
    }
  });
  constructor() { 
  }
  formatPayload(payload: number[]|number|string|undefined): number[] {
    if(Array.isArray(payload)) return payload;
    if(typeof payload === 'number') return [payload];
    if(typeof payload === 'string') return this.parsePayload(payload);
    return [];
  }
  parsePayload(str: string): number[] {
    return str.split(' ').map(el=>+el).filter(el => isNaN(el));
  }
  arrayToMessageEvent([time, tag, payload]: PortMessage): MessageEvent|null {
      return tag?new MessageEvent(time, tag, payload):null;
  }
  messageEventToArray({time, tag, payload}: MessageEvent): PortMessage {
      return [time, tag, this.formatPayload(payload)];
  }
  set input([time,tag,payload]: PortMessage) {
    if(tag) {
      this.inportRouter.next([time, tag, this.formatPayload(payload)]);
    }
  }
  set output([time, tag, payload]: PortMessage) {
    if(tag) {
      this.outportRouter.next([time, tag, payload]);
    }
  }
  linkDevice() {
    this.$inportRouter = this.inportRouter.subscribe((msg: PortMessage) => {
      let event = this.arrayToMessageEvent(msg);
      if(this.debug) {
        console.log('sending message:', msg);
        console.log('message event:', this.arrayToMessageEvent(msg));
      }
      if(event){
        this.device.send(event);
      }
    });
    this.$outportRouter = this.device.sig()?.messageEvent.subscribe((msg: MessageEvent) => {
        if(this.debug) {
          console.log('received message event:', msg);
          console.log('received message:', this.messageEventToArray(msg));
        }
        this.output = this.messageEventToArray(msg);
    });
  }
  connectExternalSubjectToInport(subject: BehaviorSubject<PortMessage>) {
    this.externalInportSubscriptions.push(subject.subscribe((msg) => {
      this.inportRouter.next(msg);
    }));
  }
  connectOuportToExternalSubject(subject: BehaviorSubject<PortMessage>) {
    this.externalOutportSubscriptions.push(this.outportRouter.subscribe((msg) => {
      subject.next(msg);
    }));
  }
  cleanup() {
    ///this.inportInfoMap.clear();
    ///this.outportInfoMap.clear();
    this.$inportRouter?.unsubscribe();
    this.$outportRouter?.unsubscribe();
    this.externalInportSubscriptions.forEach(sub => sub.unsubscribe());
    this.externalOutportSubscriptions.forEach(sub => sub.unsubscribe());
    return this;
  }
}
