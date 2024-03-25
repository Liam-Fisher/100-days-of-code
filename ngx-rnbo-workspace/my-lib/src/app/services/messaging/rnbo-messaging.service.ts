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

  inportIds = computed(() => [...this.inportInfoMap.keys()]);
  outportIds = computed(() => [...this.outportInfoMap.keys()]);
  
  constructor(public device: RnboDeviceService) { 
    effect(() => {
      this.device.sig()?.inports.forEach((port) => {
        this.inportInfoMap.set(port.tag, port);
      });
      this.device.sig()?.outports.forEach((port) => {
        this.outportInfoMap.set(port.tag, port);
      });
    });
  }
  get inports() {
    return [...this.inportInfoMap.values()];
  }
  get outports() {
    return [...this.outportInfoMap.values()];
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
  arrayToMessageEvent([time, tag, payload]: PortMessage): MessageEvent {
      return new MessageEvent(time, tag, payload);
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
      this.device.send(this.arrayToMessageEvent(msg));
    });
    this.$outportRouter = this.device.sig()?.messageEvent.subscribe((msg: MessageEvent) => {
        this.output = this.messageEventToArray(msg);
    });
  }
  
  pipeIntoInportSubject<TMsg extends PortMessage|IPortMessage|string>(subject: BehaviorSubject<TMsg>) {
    const initialValue = subject.value;
    let subscription: Subscription;
    if(typeof initialValue === 'string') {
      subscription = subject.subscribe((msg) => {
        this.input = [0, initialValue, []];
      
      });
    }
    else if(Array.isArray(initialValue)) {
    
    }
    else {

    }
    return subject.subscribe((msg) => {
      this.input = msg as PortMessage;
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
    this.inportInfoMap.clear();
    this.outportInfoMap.clear();
    this.$inportRouter?.unsubscribe();
    this.$outportRouter?.unsubscribe();
    this.externalInportSubscriptions.forEach(sub => sub.unsubscribe());
    this.externalOutportSubscriptions.forEach(sub => sub.unsubscribe());
  }
}
