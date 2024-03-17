import { Component } from '@angular/core';

@Component({
  selector: 'app-test-audio-component',
  standalone: true,
  imports: [],
  templateUrl: './test-audio-component.component.html',
  styleUrl: './test-audio-component.component.scss'
})
export class TestAudioComponentComponent {

  get loadedContext() {
    if(!this.isLoaded()) return null;
    return this.context();
  }
  get dac() {
    return this.loadedContext?.destination??null;
  }
  async createAdc() {
    if(!this.loadedContext) return;
    const userMicrophone = await navigator.mediaDevices.getUserMedia({ audio: true });
    if(!userMicrophone) return;
    this.adc = this.loadedContext.createMediaStreamSource(userMicrophone);
  }
  async createAudioContext(context: AudioContext|null) {
    if(context === null) {
      context = new AudioContext();
      console.log('created new audio context');
    }
    console.log('resuming audio context');
    await context.resume();
    this.context.set(context);
    console.log('audio context resumed');
    this.gain_in = context.createGain();
    this.gain_in.gain.setValueAtTime(0.1, 0);
    this.gain_out = context.createGain();
    this.gain_out_value = this.gain_out.gain;
    console.log(` gain out param:`, this.gain_out_value);
  }
  linkGainIO(node: AudioNode) {
    if(!this.gain_in || !this.gain_out) return;
    if(node.numberOfInputs > 0) {
      console.log('connecting node to gain in');
      this.gain_in.connect(node);
    }
    if(node.numberOfOutputs > 0) {
      console.log('connecting gain out to node');
      node.connect(this.gain_out);
    }
  }
  unlinkGainIO(node: AudioNode) {
    this.gain_in.disconnect(node);
    node.disconnect(this.gain_out);
  }
  routeOut() {
    if(!this.dac) return;
    this.gain_out.connect(this.dac);
  }
  removeRouteOut() {
    if(!this.dac) return;
    this.gain_out.disconnect(this.dac);
  }
  async routeIn() {
    if(!this.adc) await this.createAdc();
    if(!this.adc) return;
    this.adc.connect(this.gain_in);
  }
  async removeRouteIn() {
    if(!this.adc) await this.createAdc();
    if(!this.adc) return;
    this.adc.disconnect(this.gain_in);
  }
  normalizeGain(v: number) {
    return Math.max(-96, Math.min(12, 20 * Math.log10(v*0.99+0.001)));
  }
  setInputGain(value: number) {
    let t = this.context()?.currentTime ?? null;
    if(t === null) return;
    console.log(`setting input gain to ${value}`);
    console.log(`current time: ${t}`);
  }
  setOutputGain(tgt: number) {
    this.ngZone.runOutsideAngular(() => {
      let t = this.context()?.currentTime ?? null;
      if(t === null) return;
      let val = this.gain_out.gain.value;
      this.gain_out.gain.setValueAtTime(val, t);
      this.gain_out.gain.linearRampToValueAtTime(tgt, t+1);
      setTimeout(() => console.log(`ramp to ${tgt} from ${val} completed at time ${t}`), 1000);
    });
  }
}
