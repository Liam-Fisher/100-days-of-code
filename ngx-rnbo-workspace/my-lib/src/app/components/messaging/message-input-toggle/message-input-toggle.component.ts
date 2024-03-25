import { Component, Input, effect, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-message-port-mode-toggle',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <input type="checkbox" [formControl]="control" />
  `,
  styles: ``
})
export class MessagePortModeToggleComponent {
  
  value = model<boolean>(false);
  control = new FormControl<boolean>(false, {nonNullable: true});
  setEffect = effect(() => this.control.setValue(this.value()));
  getSubscription = this.control.valueChanges.subscribe((v) => this.value.set(v));
}
