import { Component, ElementRef, ModelSignal, Signal, computed, effect, input, model, viewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-id-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <select #select [formControl]="selectFormControl">
  @for(id of ids(); track $index) {
    <option [value]="id">{{id}}</option>
  }
  </select>
  `,
  styles: ``
})
export class IdSelectComponent {
  ids = input.required<string[]>();
  selectModel = input.required<Signal<string>>();
  selectFormControl = new FormControl<string>('', {nonNullable: true});
  selection = model<string>('');
  validSelection = computed(() => this.ids().includes(this.selection()));
  selectionChangeSubscription = this.selectFormControl.valueChanges.subscribe((id: string) => this.selection.set(id));
  selectionChangeEffect = effect(() => this.validSelection() ? this.selectFormControl.setValue(this.selection()) : void 0);

  
}
