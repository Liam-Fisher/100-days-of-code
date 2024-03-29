import { Component, effect, input, model, output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-rnbo-midi-device-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <select [formControl]="control">
  <option value="0">Select a device</option>
  @for(port of ports(); track $index){
    <option value="$index+1">{{port.name}}</option>
  }
  </select>
  `,
  styles: ``
})
export class RnboMidiDeviceSelectComponent {
  ports = input.required<MIDIPort[]>(); 
  index = model<number>(0);
  $index = effect(() => this.control.setValue(this.index()));
  control = new FormControl<number>(0, {nonNullable: true});
  $control = this.control.valueChanges
  .subscribe((value) => value?this.index.set(value-1):0);


}
