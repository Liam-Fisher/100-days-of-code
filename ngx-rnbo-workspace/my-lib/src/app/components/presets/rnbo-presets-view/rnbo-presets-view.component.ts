import { Component, effect, inject, viewChild } from '@angular/core';
import { PresetsIdSelectComponent } from '../presets-id-select/presets-id-select.component';
import { RnboPresetsService } from '../../../services/presets/rnbo-presets.service';
import { PresetCreateInputComponent } from '../preset-create-input/preset-create-input.component';

@Component({
  selector: 'ngx-rnbo-presets-view',
  standalone: true,
  imports: [PresetsIdSelectComponent, PresetCreateInputComponent],
  template: `
  <ngx-preset-id-select [ids]="presets.ids()"></ngx-preset-id-select>
<div>
  <ngx-preset-create-input [ids]="presets.ids()" (newIdChange)="create($event)"></ngx-preset-create-input>
</div>
<div>
  <button (click)="presets.update()" [disabled]="!presets.isDirty()">Update</button>
  <button (click)="presets.load()" [disabled]="!presets.isDirty()">Load</button>
  <button (click)="presets.delete()">Delete</button>
</div>
  `,
  styles: ``
})
export class RnboPresetsViewComponent {
  presets = inject(RnboPresetsService);
  idSelectElement = viewChild.required(PresetsIdSelectComponent);
$idSelected = effect(() => {
  this.presets.changeSelection(this.idSelectElement().id());
}, {allowSignalWrites: true});
  
  create(newId: string) {
    this.presets.selectedId.set(newId);
    this.presets.create();
  }

}
