import { createDevice } from "@rnbo/js";
import { NgxPatcher } from "../../../types/patcher";
import { RnboDeviceService } from "../rnbo-device.service";
import { formatNgxDevice } from "./formatNgx";
import { NgxDevice } from "../../../types/device";

export async function load(this: RnboDeviceService, id: string, p: string|NgxPatcher) {
    this.isLoaded.set(false);
    try {
        const context = this.audio.context;
        console.log(`loading device ${id} using context`, context);

        const patcher = (typeof p ==='string' ? JSON.parse(p) : p) as NgxPatcher;
        console.log('loading device using patcher', patcher);

        const device =  await createDevice({patcher, context}) as unknown as NgxDevice;
        formatNgxDevice(patcher, device);

        await this.audio.createAudioGraph(device);
        
        this.sig.set(device);
        this.isLoaded.set(true);
    } catch (e) {
        console.error('error loading device', e);
        throw e;
    }
  }