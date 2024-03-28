import { Component, computed, effect, input, model, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'ngx-preset-create-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <input type="text" placeholder="New..." [formControl]="control" />
  @if(newName()) {
    <button (click)="create()" [disabled]="control.valid">Create</button>
  }

  `,
  styles: ``
})
export class PresetCreateInputComponent {
  ids = input.required<string[]>();
  newId = model<string>('');
  $newId = effect(() => this.control.setValue(this.newId(), {emitEvent: false}));
  newName = signal<boolean>(false);
  control = new FormControl<string>('', {nonNullable: true});
  $control = this.control.valueChanges
  .subscribe((id) => this.newName.set((!this.ids().includes(id))&&(this.control.valid)&&(!!id)));
  create() {
    this.newId.set(this.control.value);
  }
}
