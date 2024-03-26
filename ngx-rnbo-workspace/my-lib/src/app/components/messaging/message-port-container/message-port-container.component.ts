import { Component, EventEmitter, Input, computed, effect, inject, input, model, untracked, viewChild } from '@angular/core';
import { MessagePayloadInputComponent } from '../message-payload-input/message-payload-input.component';
import { MessagePortTagSelectComponent } from '../message-port-tag-select/message-port-tag-select.component';
import { MessagePortModeToggleComponent } from '../message-input-toggle/message-input-toggle.component';
import { MessageTimeInputComponent } from '../message-time-input/message-time-input.component';
import { NgxPortInfo, PortMessage } from '../../../types/messaging';
import { MessageSendButtonComponent } from '../message-send-button/message-send-button.component';
import { RnboMessagingService } from '../../../services/messaging/rnbo-messaging.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-message-port-container',
  standalone: true,
  imports: [
    MessagePayloadInputComponent, 
    MessagePortTagSelectComponent, 
    MessagePortModeToggleComponent, 
    MessageTimeInputComponent, 
    MessageSendButtonComponent
  ],
  template: `
  <div>
    <ngx-message-port-mode-toggle></ngx-message-port-mode-toggle>
    <ngx-message-time-input [displayMode]="displayMode()"></ngx-message-time-input>
    <ngx-message-port-tag-select [ports]="ports()" [displayMode]="displayMode()"></ngx-message-port-tag-select>
    <ngx-message-payload-input [port]="port()" [displayMode]="displayMode()"></ngx-message-payload-input>
    <ngx-message-send-button (click)="sendMessage()" [displayMode]="displayMode()"></ngx-message-send-button>
  </div>
  `,
  styles: ``
})
export class MessagePortContainerComponent {
  subject = input.required<BehaviorSubject<PortMessage>>();
  $subject!: Subscription;
  ports = input.required<NgxPortInfo[]>();
  
  toggleElement = viewChild.required(MessagePortModeToggleComponent);
  timeElement = viewChild.required(MessageTimeInputComponent);
  tagElement = viewChild.required(MessagePortTagSelectComponent);
  payloadElement = viewChild.required(MessagePayloadInputComponent);

  displayMode = computed(() => this.toggleElement().isDisplayMode()??false);
  time = computed<number>(() => this.timeElement().time()??0);
  tag = computed<string>(() => this.tagElement().tag()??'');
  port = computed<NgxPortInfo|null>(() => this.tagElement().port());
  payload = computed(() => this.payloadElement().payload()??[]);
  
  receiveMessage = effect(() => {
    this.$subject = this.subject().subscribe((msg) => {
      if(this.displayMode()) {
        let [time, tag, payload] = msg;
        this.timeElement().time.set(time);
        this.tagElement().tag.set(tag);
        this.payloadElement().payload.set(payload);
      }
    });
  }, {allowSignalWrites: true});
  constructor() { }
  
sendMessage() {
  if(!this.displayMode()) {
      this.subject().next([this.time(), this.tag(), this.payload()]);
    }
  }
  ngOnDestroy() {
    this.receiveMessage.destroy();
    this.$subject.unsubscribe();
  }
}
