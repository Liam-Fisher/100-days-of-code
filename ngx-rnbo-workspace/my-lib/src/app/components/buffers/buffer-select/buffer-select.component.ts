import { Component, computed, inject, input, model, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RnboBufferService } from '../../../services/buffers/rnbo-buffer-service.service';

@Component({
  selector: 'ngx-buffer-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <select #selectBuffer [formControl]="bufferSelectionControl" >
  @for(id of ids(); track $index) {
    <option [value]="id">{{id}}</option>
  }
  </select>

    `,
  styles: ``
})
export class BufferSelectComponent {
  bufferService = inject(RnboBufferService);
  ids = computed(() => this.bufferService.bufferIds()); 
  bufferSelectionControl = new FormControl<string>('', {nonNullable: true});
  
  bufferSelectionChangeSubscription = this.bufferSelectionControl.valueChanges.subscribe((id: string) => {
    let buffers = this.ids();

      if(buffers.includes(id)) {
        console.log(`loading buffer ${id}`);
        this.bufferService.selectedBufferId.set(id);
      }
      else {
        console.log(`buffer ${id} not found`);
        console.log('buffer list', this.ids());
      }
  });
}
