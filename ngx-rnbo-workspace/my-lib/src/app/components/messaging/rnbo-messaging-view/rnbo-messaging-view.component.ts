import { Component, ElementRef, effect, inject, viewChild } from '@angular/core';
import { MessagePortContainerComponent } from '../message-port-container/message-port-container.component';
import { RnboMessagingService } from '../../../services/messaging/rnbo-messaging.service';
import { AsyncPipe } from '@angular/common';
import { PortMessage } from '../../../types/messaging';
import { MessagePortModeToggleComponent } from '../message-input-toggle/message-input-toggle.component';
import { MessagingUiService } from '../../../services/messaging/messaging-ui.service';
import { MessageTimeInputComponent } from '../message-time-input/message-time-input.component';
import { MessagePortTagSelectComponent } from '../message-port-tag-select/message-port-tag-select.component';
import { MessagePayloadInputComponent } from '../message-payload-input/message-payload-input.component';
import { PayloadDisplayPipe, PayloadMessagePipe } from '../pipes/payload-message.pipe';
import { MessageSendButtonComponent } from '../message-send-button/message-send-button.component';

@Component({
  selector: 'ngx-rnbo-messaging-view',
  standalone: true,
  providers: [MessagingUiService],
  imports: [
    AsyncPipe,
    PayloadDisplayPipe,
    PayloadMessagePipe,
    MessagePortContainerComponent,
     MessagePortModeToggleComponent,
    MessageTimeInputComponent,
    MessagePortTagSelectComponent, 
    MessagePayloadInputComponent,
    MessageSendButtonComponent],
  template: `
  <p>Inports</p>
  <ngx-message-port-mode-toggle (valueChange)="logToggle($event)"></ngx-message-port-mode-toggle>
  <ngx-message-time-input (timeChange)="logTime($event)"></ngx-message-time-input>
  <ngx-message-port-tag-select [ports]="messaging.inports()" (portChange)="logTag($event)"></ngx-message-port-tag-select>
  <ngx-message-payload-input (payloadChange)="logPayload($event)"></ngx-message-payload-input>
  <ngx-message-send-button (click)="send()" [displayMode]="false"></ngx-message-send-button>

  `,
  styles: ``
})
export class RnboMessagingViewComponent {

  messaging = inject(RnboMessagingService);
  messagingUI = inject(MessagingUiService);
  displayMode = false;
  time = 0;
  tag = '';
  payload: number[] = [];
  portsLoaded = effect(() => {
    console.log(`loading ports`);
    const ports = this.messaging.inports();
    ports.forEach((port) => console.log(port));
  });
constructor() {}
send() {
  console.log(`sending message ${this.time} ${this.tag} ${this.payload.toString()}`);
  this.messaging.input = [this.time, this.tag, this.payload];
}
logPayload(payload: number[]) {
  console.log(`logging payload ${payload.toString() }`);
  this.payload = payload;
}
logTag(tag: string) {
  console.log(`logging tag ${tag}`);
  this.tag = tag;
}
logToggle(value: boolean) {
  console.log(`logging toggle ${value}`);
  this.displayMode = value;
}
logTime(time: number) {
  console.log(`logging time ${time}`);
  this.time = time;
}

  /* 
  $inportDisplay = this.messagingService.inportRouter?.subscribe((msg) => {
      this.inportElement()?.nativeElement?.messageIn(msg);
  }); *//* 
  $outportDisplay = this.messagingService.outportRouter?.subscribe((msg) => {
    this.outportElement()?.nativeElement?.messageIn(msg);
  }); */
  /* 
  $inportSend = this.inportElement()?.nativeElement?.messageOut.subscribe((msg) => {
    this.messagingService.input = msg;
  });
  $outportSend = this.outportElement()?.nativeElement?.messageOut.subscribe((msg) => {
    this.messagingService.output = msg;
  }); */
  ngOnDestroy() {
    //this.$inportDisplay?.unsubscribe();
    //this.$outportDisplay.unsubscribe();
    //this.$inportSend?.unsubscribe();
    //this.$outportSend?.unsubscribe();
  }
}
