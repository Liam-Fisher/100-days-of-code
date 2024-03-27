import { Injectable, inject } from '@angular/core';
import { RnboDeviceService } from '../device/rnbo-device.service';

@Injectable()
export class RnboPresetsService {
  device = inject(RnboDeviceService);
  

  constructor() { }
  
}
