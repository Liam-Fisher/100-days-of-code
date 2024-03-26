import { Component, ElementRef, Host, HostListener, effect, inject, signal, viewChild } from '@angular/core';
import { MessagePortContainerComponent } from '../message-port-container/message-port-container.component';
import { RnboMessagingService } from '../../../services/messaging/rnbo-messaging.service';

@Component({
  selector: 'ngx-rnbo-messaging-view',
  standalone: true,
  providers: [],
  imports: [MessagePortContainerComponent],
  template: `
  <div>
  <p>Inports</p>
  <ngx-message-port-container #inport 
  [ports]="messaging.inports()"
  [subject]="messaging.inportRouter"
  ></ngx-message-port-container>
  </div>
  <div>
    <p>Outports</p>
    <ngx-message-port-container #outport 
  [ports]="messaging.outports()"
  [subject]="messaging.outportRouter"
  ></ngx-message-port-container></div>
  `,
  styles: ``
})
export class RnboMessagingViewComponent {

  messaging = inject(RnboMessagingService);
constructor() {}  


}
