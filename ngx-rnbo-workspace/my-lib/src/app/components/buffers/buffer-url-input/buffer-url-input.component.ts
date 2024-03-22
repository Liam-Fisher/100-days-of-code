import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RnboBufferService } from '../../../services/buffers/rnbo-buffer-service.service';




@Component({
  selector: 'ngx-buffer-url-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input type="text" placeholder="Enter a URL" [formControl]="urlInputFormControl" />
  `,
  styles: ``
})
export class BufferUrlInputComponent {
  bufferService = inject(RnboBufferService);  
  urlInputFormControl = new FormControl('');
  $urlInputFormControl = this.urlInputFormControl.valueChanges.subscribe((v) => {
      try {
        let url = new URL(v??'this will fail');
        this.bufferService.loadBuffer(url.toString());
      }
      catch(e) {
        console.error(e);
      }
  });
    constructor() { }
}
