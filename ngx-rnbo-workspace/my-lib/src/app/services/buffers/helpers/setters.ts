import { BaseDevice } from "@rnbo/js";
import { RnboBufferService } from "../rnbo-buffer-service.service";

export async function setAudioFromUrl(this: RnboBufferService, id: string, url: string) {
    if(this.deviceBuffers.has(id)) {
        const ngxBuffer = this.deviceBuffers.get(id); 
        (await BaseDevice.fetchAudioData(url, this.audio.context))??null;
        
    }
    const buffer = (await BaseDevice.fetchAudioData(url, this.audio.context))??null;
    
    return buffer;
}
  async getAudioFromDevice(id: string) {
    this.device.loading.next('buffer');
    const buffer = (await this.device.sig()?.releaseDataBuffer(id));
    this.device.loading.next('none');
    return buffer?.getAsAudioBuffer(this.audio.ctx)??null;
  }
  async setAudioInDevice(id: string, buffer: AudioBuffer|null): Promise<void> {
    this.device.loading.next('buffer');
    if(buffer)  {
      await this.device.sig()?.setDataBuffer(id, buffer);
    }
    this.device.loading.next('none');
  }