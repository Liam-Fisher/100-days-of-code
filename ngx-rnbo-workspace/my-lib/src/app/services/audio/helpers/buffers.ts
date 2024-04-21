import { AudioService } from "../audio.service";

export function createBoopBuffer(ctx: AudioContext, frameCount: number = 2048) {
    const myArrayBuffer = ctx.createBuffer(1, frameCount, ctx.sampleRate);
    const nowBuffering = myArrayBuffer.getChannelData(0);
      for (let i = 0; i < frameCount; i++) {
        nowBuffering[i] = Math.sin(Math.PI * (i / frameCount)*55)*0.2;
      }
    return myArrayBuffer;
}

export async function encodeBlob(this: AudioService, blob: Blob) {  
  return await this.context.decodeAudioData(await blob.arrayBuffer());
}
  
export function playBuffer<T extends AudioNode>(this: AudioService, buf: AudioBuffer, tgt?: T) {
    let testSrc = this.context.createBufferSource();
    testSrc.buffer = buf;
    testSrc.connect(tgt ?? this.);
    testSrc.start();   console.log(`beginning buffer playback test`);
    testSrc.onended = () => console.log(`buffer playback test complete`);
}

export function createAudioBuffer(this: AudioService, buffers: (ArrayBuffer|Float32Array)[]) {
  let channelCount = buffers.length;
  let length = buffers[0].byteLength/4;
  let buffer = this.context.createBuffer(channelCount, this.context.sampleRate, length);
  for(let i=1;i<buffers.length;i++) {
    if(buffers[i] instanceof ArrayBuffer) {
      buffers[i] = new Float32Array(buffers[i]);
    }
    buffer.copyToChannel(buffers[i] as Float32Array, i);
  }
  return buffer;
}