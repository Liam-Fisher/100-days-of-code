import { Component, effect, inject, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RnboTimingService } from '../../../services/timing/timing.service';

@Component({
  selector: 'ngx-transport-toggle',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <input type="checkbox" [formControl]="control" />
  `,
  styles: ``
})
export class TransportToggleComponent {
  transport = model<boolean>(false);
  $transport = effect(() => this.control.setValue(this.transport(), {emitEvent: false})); 
  control = new FormControl<boolean>(false, {nonNullable: true});
  $control = this.control.valueChanges.subscribe(val => this.transport.set(val));
  constructor() { }

}
