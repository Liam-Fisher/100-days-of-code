import { Component, inject, viewChild } from '@angular/core';
import { RnboMessagingService } from '../../../services/messaging/rnbo-messaging.service';
import { MessagePayloadInputComponent } from '../message-payload-input/message-payload-input.component';
import { MessagePortTagSelectComponent } from '../message-port-tag-select/message-port-tag-select.component';

@Component({
  selector: 'ngx-message-port-container',
  standalone: true,
  imports: [MessagePayloadInputComponent, MessagePortTagSelectComponent],
  template: `
  <ngx-message-port-tag-select [ports]="messagingService.outports"></ngx-message-port-tag-select>
  <ngx-message-payload-input></ngx-message-payload-input>
  <button>Send</button>
  `,
  styles: ``
})
export class MessagePortContainerComponent {
  messagingService = inject(RnboMessagingService);
  tag = viewChild(MessagePortTagSelectComponent);
  payload = viewChild(MessagePayloadInputComponent);
  displaySubscription = this.messagingService.inportRouter.subscribe(([number, tag, payload]) => {
  
  });
    send() {
    let tag = this?.tag()?.value?.tag;
    let payload = this?.payload()?.value;
    if(tag && payload) {
      this.messagingService.output = [tag, payload];
    }
  }
}
