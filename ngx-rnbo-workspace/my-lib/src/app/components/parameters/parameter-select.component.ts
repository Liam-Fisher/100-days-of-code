import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxParameter } from '../../services/parameters/helpers/ngxparameter';

@Component({
  selector: 'ngx-parameter-select',
  standalone: true,
  imports: [ ReactiveFormsModule],
  template: `
  <select #enum [formControl]="param().formControl">
  @for (item of param().enumValues(); track $index) {
    <option [value]="$index">{{item}}</option>
  }
  </select>
  `,
  styles: ``
})
export class ParameterSelectComponent {
  param = input.required<NgxParameter>();
  constructor() {
  }
}
