import { Component, Input } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export type PortMode = ('hide' | 'show' | 'input');
@Component({
  selector: 'ngx-message-port-mode',
  standalone: true,
  imports: [MatButtonToggleModule, ReactiveFormsModule],
  template: `
  <mat-button-toggle-group aria-label="Font Style" [formControl]="ctl">
    <mat-button-toggle value="hide">Hide</mat-button-toggle>
    <mat-button-toggle value="show">Show</mat-button-toggle>
    <mat-button-toggle value="input">Input</mat-button-toggle>
  </mat-button-toggle-group>
  `,
  styles: ``
})
export class MessagePortModeComponent {
  ctl = new FormControl<PortMode>('hide', {nonNullable: true});
  @Input() set value(v: PortMode) {
    this.ctl.setValue(v);
  }
}
