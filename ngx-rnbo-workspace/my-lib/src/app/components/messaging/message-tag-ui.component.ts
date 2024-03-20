import { Component, Input,  input } from '@angular/core';
import {  FormControl, FormsModule,  ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NgxPortInfo } from 'projects/ngx-rnbo/src/lib/types/rnbo-extensions/messaging';

@Component({
  selector: 'ngx-message-tag-select',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  template: `
  <mat-form-field>
  <mat-label>{{label()}}</mat-label>
    <mat-select [formControl]="ctl" required>
      @for(port of ports(); track $index) {
        <mat-option [value]="port">{{port.tag}}</mat-option>
    }
    </mat-select>
  </mat-form-field>
  `,
  styles: ``
})
export class MessageTagComponent {
  label = input.required();
  ports = input<NgxPortInfo[]>([]);
  @Input() set value(v: NgxPortInfo|null) {
    this.ctl.setValue(v);
  }
  get value() {
    return this.ctl.value;
  }
  ctl = new FormControl<NgxPortInfo|null>(null, Validators.required);
}

