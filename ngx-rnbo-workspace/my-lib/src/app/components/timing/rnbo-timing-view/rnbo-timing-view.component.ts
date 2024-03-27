import { Component, computed, effect, inject, viewChild } from '@angular/core';
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
  // timing = inject(RnboTimingService); may find a use for this later, but for now it's not needed
  device= inject(RnboDeviceService);
  transportElement = viewChild.required(TransportToggleComponent);
  beattimeElement = viewChild.required(BeattimeInputComponent);
  tempoElement = viewChild.required(TempoInputComponent);
  timeSignatureElement = viewChild.required(TimeSignatureSelectComponent);

  transport = computed<boolean>(() => this.transportElement().transport());  
  beattime = computed<number>(() => this.beattimeElement().beattime()??0);
  tempo = computed<number>(() => this.tempoElement().tempo()??0);
  timeSignature = computed<[number, number]>(() => this.timeSignatureElement().timeSignature()??[4,4]);

  $transport = effect(() => this.device.setTransport(this.transport()));
  $beattime = effect(() => this.device.setBeattime(this.beattime()));
  $tempo = effect(() => this.device.setTempo(this.tempo()));
  $timeSignature = effect(() => this.device.setTimeSignature(this.timeSignature()));

  constructor() { }
}
