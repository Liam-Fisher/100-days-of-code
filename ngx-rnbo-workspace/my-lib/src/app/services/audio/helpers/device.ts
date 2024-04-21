import { NgxDevice } from "../../../types/device";
import { AudioService } from "../audio.service";

export async function connectDevice(this: AudioService, device: NgxDevice) {

  this.device_node = device.node;
  
  if(this.gain_in === null) throw new Error('input gain must be created before connecting device node');
  if(this.gain_out === null) throw new Error('output gain must be created before connecting device node');

  if(!this.device_node?.numberOfInputs) this.gain_in.connect(this.device_node);
  else console.warn('device node has no inputs');

  if(!this.device_node?.numberOfOutputs) this.device_node.connect(this.gain_out);
  else console.warn('device node has no outputs');

}

export async function disconnectDevice(this: AudioService) {

  if(this.device_node === null) throw new Error('device node must be defined to disconnect it');
  if(!this.gain_in) throw new Error('input gain must be defined to disconnect it');
  if(!this.gain_out) throw new Error('output gain must be defined to disconnect it');

  if(this.device_node?.numberOfInputs) this.gain_in.disconnect(this.device_node);
  if(this.device_node?.numberOfOutputs) this.device_node.disconnect(this.gain_out);

  this.device_node = null;
}