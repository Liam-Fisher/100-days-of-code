import { Component, input, model, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter } from 'rxjs';
@Component({
  selector: 'ngx-patcher-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <select #selectPatcher [formControl]="patcherSelectControl" >
@for (item of patcherList(); track $index) {
  <option [value]="item">{{item}}</option>
}
</select>
  `,
  styles: ``
})
export class PatcherSelectComponent {
  patcherList = input.required<string[]>();
  protected patcherSelectControl = new FormControl('', {nonNullable: true});
  $patcherSelectControl = this.patcherSelectControl.valueChanges;
  
  
}
