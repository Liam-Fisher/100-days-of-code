import { Component, computed, effect, inject, input, model, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RnboBufferService } from '../../../services/buffers/rnbo-buffer-service.service';
import { TaggedDataRef } from '../../../types/buffers';

@Component({
  selector: 'ngx-buffer-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <select [formControl]="control" >
  <option value="0">--Select a buffer--</option>
  @for(ref of refs(); track $index) {
    <option [value]="$index+1">{{ref.id}}</option>
  }
  </select>

    `,
  styles: ``
})
export class BufferSelectComponent {
  refs = input.required<TaggedDataRef[]>();
  ids = computed(() => this.refs().map(ref => ref.id));
  id = model<string>('');
  $id = effect(() => this.control.setValue(this.ids().indexOf(this.id())+1, {emitEvent: false}));
  control = new FormControl<number>(0, {nonNullable: true});
  $control = this.control.valueChanges
  .subscribe((i) => i?this.id.set(this.ids()[i-1]):this.id.set(''));
  
}
