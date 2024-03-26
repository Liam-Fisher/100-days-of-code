import { Component, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'ngx-message-port-mode-toggle',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <input type="checkbox" [formControl]="control"/>
  `,
  styles: ``
})
export class MessagePortModeToggleComponent {
  isDisplayMode = model<boolean>(false);
  control = new FormControl<boolean>(false, {nonNullable: true});
  $control = this.control.valueChanges
  .subscribe((v) => this.isDisplayMode.set(v));
}

