import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { MessagePortContainerComponent } from '../message-port-container/message-port-container.component';
import { RnboMessagingService } from '../../../services/messaging/rnbo-messaging.service';
import { AsyncPipe } from '@angular/common';
import { PortMessage } from '../../../types/messaging';

@Component({
  selector: 'ngx-rnbo-messaging-view',
  standalone: true,
  imports: [MessagePortContainerComponent,AsyncPipe],
  template: `
  <p>Inports</p>
  <ngx-message-port-container #inport 
  [ports]="messaging.inports" 
  [activeMessage]="(messaging.inportRouter|async)??[0,'',[]]" 
  (activeMessageChange)="messaging.input = $event"
  ></ngx-message-port-container> 
  `,
  styles: ``
})
export class RnboMessagingViewComponent {

  messaging = inject(RnboMessagingService);

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
