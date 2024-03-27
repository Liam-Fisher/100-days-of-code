import { Component, effect, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-beattime-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <input type="text" [formControl]="control" />
    
  `,
  styles: ``
})
export class BeattimeInputComponent {
  beattime = model<number>(0);
  $tempo = effect(() => this.control.setValue(this.beattime()+'', {emitEvent: false}));
  control = new FormControl<string>("0", {nonNullable: true});
  $control = this.control.valueChanges
  .subscribe((val) => isNaN(+val)?null:this.beattime.set(+val));
  constructor() { }
}
