import { Component, input, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'ngx-patcher-select',
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule],
  template: `
  <mat-select [formControl]="patcherSelectControl">
  @for (item of patcherList(); track $index) {
    <mat-option [value]="item">{{item}}</mat-option>
  }
  </mat-select>
  `,
  styles: ``
})
export class PatcherSelectComponent {
  patcherList = input<string[]>([]);
  patcherSelectControl = new FormControl('', {nonNullable: true});
  
}
