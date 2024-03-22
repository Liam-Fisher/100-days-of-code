import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-rnbo-buffers-view',
  standalone: true,
  imports: [],
  template: `
    <h1>Buffers</h1>
  `,
  styles: ``
})
export class RnboBuffersViewComponent {
  bufferSelectionControl = new FormControl<string>('');

}
