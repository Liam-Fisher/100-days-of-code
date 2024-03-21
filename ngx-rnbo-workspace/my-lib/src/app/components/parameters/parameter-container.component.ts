import { Component, EffectRef, Injector, computed, effect, inject, input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { ParameterSliderComponent } from './parameter-slider.component';
import { ParameterSelectComponent } from './parameter-select.component';
import { NgxParameter } from '../../services/parameters/helpers/ngxparameter';

@Component({
  selector: 'ngx-parameter-container',
  standalone: true,
  imports: [
    MatSliderModule, 
    FormsModule, 
    ReactiveFormsModule, 
    ParameterSliderComponent, 
    ParameterSelectComponent
  ],
  template: `
  @if(param !== null) {
    <p>{{displayName()}}</p>
   @switch (notNullParam().uiType()) {
    @case('slider') {
      <ngx-parameter-slider [param]="notNullParam()" [id]="displayName()"></ngx-parameter-slider>
    <!-- other number types: number  -->
    
    }
    @case('select') {
      <ngx-parameter-select [param]="notNullParam()" [id]="displayName()"></ngx-parameter-select>
      <!-- other enum types: toggle, radiogroup -->
    }
    @default {
      <p>Unsupported UI Type</p>
    }
  }
}
  `,
  styles: ``
})
export class ParameterContainerComponent {
  displayName = input.required<string>();
  param = input.required<NgxParameter|null>();
  notNullParam = computed<NgxParameter>(() => this.param() as NgxParameter); // this is a hack to get around the fact that the input is nullable
  constructor() { }
}
