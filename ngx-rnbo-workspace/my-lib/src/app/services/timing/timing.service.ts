import { Injectable, inject, signal } from '@angular/core';
import { RnboDeviceService } from '../device/rnbo-device.service';

@Injectable()
export class RnboTimingService {
  device = inject(RnboDeviceService);
  beattime = signal<number>(0);
  tempo = signal<number>(0);
  timeSignature = signal<number[]>([4, 4]);
  transport = signal<boolean>(false);
  
  constructor() { }
}
