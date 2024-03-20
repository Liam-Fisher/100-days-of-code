import { Component, ElementRef, computed, input, viewChild } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxParameter } from '../../services/parameters/helpers/ngxparameter';
import { retry } from 'rxjs';

@Component({
  selector: 'ngx-parameter-slider',
  standalone: true,
  imports: [MatSliderModule, MatInputModule, ReactiveFormsModule],
  template: `
  <label [for]="id()">{{param().valueLabel()}}</label>
  <input #numslider [id]="id()" type="range" [formControl]="param().formControl" min="0" max="1" step="0.01">
  
  `,
  styles: ``
})
export class ParameterSliderComponent {
  param = input.required<NgxParameter>();
  id = input.required<string>();
  constructor() { }
  
  
}
