import { Component, computed, effect, inject, untracked, viewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimingMessage } from '../../../types/timing';
import { BeattimeInputComponent } from '../beattime-input/beattime-input.component';
import { TransportToggleComponent } from '../transport-toggle/transport-toggle.component';
import { TempoInputComponent } from '../tempo-input/tempo-input.component';
import { TimeSignatureSelectComponent } from '../time-signature-select/time-signature-select.component';
import { RnboTimingService } from '../../../services/timing/timing.service';
import { RnboDeviceService } from '../../../services/device/rnbo-device.service';
import { TransportEvent } from '@rnbo/js';

@Component({
  selector: 'ngx-rnbo-timing-view',
  standalone: true,
  imports: [BeattimeInputComponent, TransportToggleComponent, TempoInputComponent, TimeSignatureSelectComponent],
  template: `
  <ngx-transport-toggle></ngx-transport-toggle>
  <ngx-beattime-input></ngx-beattime-input>
  <ngx-tempo-input></ngx-tempo-input>
  <ngx-time-signature-select></ngx-time-signature-select>
  `,
  styles: ``
})
export class RnboTimingViewComponent {
  
  timing = inject(RnboTimingService);

  transportElement = viewChild.required(TransportToggleComponent);
  beattimeElement = viewChild.required(BeattimeInputComponent);
  tempoElement = viewChild.required(TempoInputComponent);
  timeSignatureElement = viewChild.required(TimeSignatureSelectComponent);

  $timingService = effect(() => {
    untracked(this.transportElement).transport.set(this.timing.transport());
    untracked(this.beattimeElement).beattime.set(this.timing.beattime());
    untracked(this.tempoElement).tempo.set(this.timing.tempo());
    untracked(this.timeSignatureElement).timeSignature.set(this.timing.timeSignature());
  });

  $timingComponent = effect(() => {
    this.timing.transport.set(this.transportElement().transport());
    this.timing.beattime.set(this.beattimeElement().beattime());
    this.timing.tempo.set(this.tempoElement().tempo());
    this.timing.timeSignature.set(this.timeSignatureElement().timeSignature());
  });

  constructor() { }
}
