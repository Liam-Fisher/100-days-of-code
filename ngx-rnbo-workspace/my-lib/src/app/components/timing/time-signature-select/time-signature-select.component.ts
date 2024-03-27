import { Component, effect, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, filter, map } from 'rxjs';

@Component({
  selector: 'ngx-time-signature-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <input type="number" min="1" max="64" step="1" [formControl]="numeratorControl" />
  <select name="denominator" [formControl]="denominatorControl">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="4">4</option>
    <option value="8">8</option>
    <option value="16">16</option>
    <option value="32">32</option>
    <option value="64">64</option>  
  </select>
      
  `,
  styles: ``
})
export class TimeSignatureSelectComponent {
  timeSignature = model<[number, number]>([4,4]);
  $timeSignature = effect(() => {
    this.numeratorControl.setValue(this.timeSignature()[0]+'', {emitEvent: false});
    this.denominatorControl.setValue(this.timeSignature()[1]+'', {emitEvent: false});
  });
  numeratorControl = new FormControl<string>("4", {nonNullable: true});
  denominatorControl = new FormControl<string>("4", {nonNullable: true});

  $control =  combineLatest([this.numeratorControl.valueChanges, this.denominatorControl.valueChanges])
  .pipe(
    map(([numerator, denominator]) => [isNaN(+numerator)?+numerator:0, isNaN(+denominator)?+denominator:0]),
    filter(([numerator, denominator]) => numerator > 0 && denominator > 0)
  ).subscribe(([numerator, denominator]) => this.timeSignature.set([numerator, denominator]))
  constructor() { }


}
