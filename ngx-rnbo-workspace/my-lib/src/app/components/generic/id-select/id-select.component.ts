import { Component, ElementRef, ModelSignal, Signal, computed, effect, input, model, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'ngx-id-select',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule],
  template: `
  <mat-select [formControl]="control">
  <mat-option value="0">--Select and id</mat-option>
  @for(id of ids(); track $index) {
    <mat-option [value]="$index+1">{{id}}</mat-option>
  }
  </mat-select>
  `,
  styles: ``
})
export class IdSelectComponent {
  ids = input.required<string[]>();
  hints = input<string[]>([]);
  
  control = new FormControl<string>('');
  
  selectFormControl = new FormControl<string>('', {nonNullable: true});
  selection = model<string>('');
  validSelection = computed(() => this.ids().includes(this.selection()));
  selectionChangeSubscription = this.selectFormControl.valueChanges.subscribe((id: string) => this.selection.set(id));
  selectionChangeEffect = effect(() => this.validSelection() ? this.selectFormControl.setValue(this.selection()) : void 0);

  
}
