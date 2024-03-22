import { Component, effect, inject, input, model, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxPatcher } from '../../../types/patcher';
import { RnboDeviceService } from '../../../services/device/rnbo-device.service';
@Component({
  selector: 'ngx-patcher-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <select #selectPatcher [formControl]="patcherSelectionControl" >
@for (item of patcherList(); track $index) {
  <option [value]="item">{{item}}</option>
}
</select>
  `,
  styles: ``
})
export class PatcherSelectComponent {
  device = inject(RnboDeviceService);
  patcherList = input.required<string[]>();
  // patcherSelection = model<string>(''); // a consumer can select a patcher by name or index, or listen to user selection and load the patcher
  patcherSelectionControl = new FormControl('untitled', {nonNullable: true});
  patcherSelection = model<string>('');
  // a consumer can select a patcher by name or index, or listen to user selection and load the patcher
  patcherSelectionChangeSubscription = this.patcherSelectionControl.valueChanges.subscribe((id: string) => {
    let patchers = this.patcherList();
    
      if(patchers.includes(id)) {
        console.log(`loading patcher ${id}`);
        this.audio.isReady.set(true);
        this.patcherSelection.set(id);
      }
      else {
        console.log(`patcher ${id} not found`);
        console.log('patcher list', this.patcherList());
      }
  });

  patcher = input<string|NgxPatcher|null>(null);

  
  
}
