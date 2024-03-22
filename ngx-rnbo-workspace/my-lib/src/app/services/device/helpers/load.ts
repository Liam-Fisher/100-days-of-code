import { BaseDevice, Device, createDevice } from "@rnbo/js";
import { NgxPatcher } from "../../../types/patcher";
import { RnboDeviceService } from "../rnbo-device.service";
import { formatNgxDevice } from "./formatNgx";
import { NgxDevice } from "../../../types/device";
import { untracked } from "@angular/core";

export async function load(this: RnboDeviceService, id: string, p: string|NgxPatcher|null) {
    let context = this.audio.context;
    let prevDevice: Device|undefined;
    if(!context || !p) return;
    if(untracked(this.isLoaded)) {
        prevDevice = untracked(this.sig) as unknown as Device;
    }
    this.isLoaded.set(false);
    try {
        console.log(`loading device ${id} using context`, context);

        const patcher = (typeof p ==='string' ? JSON.parse(p) : p) as NgxPatcher;
        console.log('loading device using patcher', patcher);
        const device =  await createDevice({patcher, context}, prevDevice) as unknown as NgxDevice;
        formatNgxDevice(patcher, device);

        await this.audio.createAudioGraph(device);

        this.sig.set(device);
        this.isLoaded.set(true);
    } catch (e) {
        console.error('error loading device', e);
        throw e;
    }
}