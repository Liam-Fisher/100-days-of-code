import { Component, effect, inject,  untracked } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RnboDeviceService } from '../../../services/device/rnbo-device.service';
import { FileAccessService } from '../../../services/files/file-access.service';
import { AudioService } from '../../../services/audio/audio.service';
import { INgxPatcherInfo } from '../../../types/files';
@Component({
  selector: 'ngx-patcher-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  <select #selectPatcher [formControl]="control" >
@for (item of files.patchers(); track $index) {
  <option [value]="item">{{item.name}}</option>
}
</select>
  `,
  styles: ``
})
export class PatcherSelectComponent {
  
  audio = inject(AudioService);
  device = inject(RnboDeviceService);
  files = inject(FileAccessService);

  // patcherSelection = model<string>(''); // a consumer can select a patcher by name or index, or listen to user selection and load the patcher
  control = new FormControl<INgxPatcherInfo|null>(null);
  // a consumer can select a patcher by name or index, or listen to user selection and load the patcher
  $control = this.control.valueChanges.subscribe((patcher) => {
      if(patcher) {
        this.audio.isReady.set(true);
        this.files.patcherSelection.set(patcher);
      }
      else {
        console.log(`patcher not found`);
      }
  });

  loadDeviceOnUserInteraction = effect(() => {
    let name = untracked(this.files.patcherSelection)?.name;
    let patcher = untracked(this.files.activePatcherFile);
    if(name&&this.audio.isReady()) {
        this.device.load(name, patcher);
    }
  }, {allowSignalWrites: true});
  
}
