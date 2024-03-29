import { Component, inject, viewChild } from '@angular/core';
import { RnboMidiDeviceSelectComponent } from '../rnbo-midi-device-select/rnbo-midi-device-select.component';
import { RnboMidiService } from '../../../services/midi/rnbo-midi.service';

@Component({
  selector: 'ngx-rnbo-midi-view',
  standalone: true,
  imports: [RnboMidiDeviceSelectComponent],
  template: `
  <ngx-rnbo-midi-device-select #inputs [ports]="midi.inputs()"></ngx-rnbo-midi-device-select>
  <ngx-rnbo-midi-device-select #outputs [ports]="midi.outputs()"></ngx-rnbo-midi-device-select>
  `,
  styles: ``
})
export class RnboMidiViewComponent {
  midi = inject(RnboMidiService);
  inputIdElement = viewChild.required('inputs', {read: RnboMidiDeviceSelectComponent});
  outputIdElement = viewChild.required('outputs', {read: RnboMidiDeviceSelectComponent});

}
