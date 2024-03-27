import { Component, effect, model } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-tempo-input',
  standalone: true,
  imports: [],
  template: `
    <input type="number" min="0" max="500" step="1" />
  `,
  styles: ``
})
export class TempoInputComponent {
  tempo = model<number>(120);
  $tempo = effect(() => this.control.setValue(this.tempo()+'', {emitEvent: false}));
  control = new FormControl<string>("120", {nonNullable: true});
  $control = this.control.valueChanges
  .subscribe((val) => isNaN(+val)?null:this.tempo.set(+val));
  constructor() { }
}
