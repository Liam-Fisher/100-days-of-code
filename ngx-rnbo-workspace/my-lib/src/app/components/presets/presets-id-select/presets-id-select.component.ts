import { Component, effect, input, model } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-preset-id-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <select [formControl]="control">  
    <option value="0">--select a preset---</option>
    @for(id of ids(); track $index){
      <option [value]="$index+1">{{id}}</option>
    }
  `,
  styles: ``
})
export class PresetsIdSelectComponent {
  ids = input.required<string[]>(); 
  id = model<string>('');
  $id = effect(() => this.control.setValue(this.ids().indexOf(this.id())+1, {emitEvent: false}));
  control = new FormControl<number>(0, {nonNullable: true});
  $control = this.control.valueChanges
  .subscribe((i) => i?this.id.set(this.ids()[i-1]):this.id.set(''));
}
