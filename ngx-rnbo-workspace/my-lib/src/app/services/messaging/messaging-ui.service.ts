import { Injectable } from '@angular/core';
import { RnboMessagingService } from './rnbo-messaging.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingUiService {

  constructor(public messaging: RnboMessagingService) { }
}
