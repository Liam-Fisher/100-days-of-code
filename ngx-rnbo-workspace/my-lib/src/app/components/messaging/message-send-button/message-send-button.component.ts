import { NgClass } from '@angular/common';
import { Component, EventEmitter, input } from '@angular/core';

@Component({
  selector: 'ngx-message-send-button',
  standalone: true,
  imports: [NgClass],
  template: `
  <button (click)="sendEvent.emit()" [disabled]="displayMode()" [ngClass]="valid()?'valid-button':'invalid-button'">Send</button>
  `,
  styles: `
  .invalid-button {
      color: white;
      background-color: red;
  }
  .valid-button {
      color: white;
      background-color: green;
  }
  `
})
export class MessageSendButtonComponent {
    displayMode = input<boolean>(false);
    valid = input<boolean>(true);
    sendEvent = new EventEmitter<void>()
}
