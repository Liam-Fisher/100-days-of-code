import { WebAudioApiService } from "../web-audio-api.service";

export function createBoopBuffer(ctx: AudioContext, frameCount: number = 2048) {
    const myArrayBuffer = ctx.createBuffer(1, frameCount, ctx.sampleRate);
    const nowBuffering = myArrayBuffer.getChannelData(0);
      for (let i = 0; i < frameCount; i++) {
        nowBuffering[i] = Math.sin(Math.PI * (i / frameCount)*55)*0.2;
      }
    return myArrayBuffer;
}

export async function encodeBlob(tgt: WebAudioApiService, blob: Blob) {  
  return await tgt.decodeAudioData(await blob.arrayBuffer());
}
  
export function playBuffer<T extends AudioNode>(ctx: AudioContext, buf: AudioBuffer, tgt?: T) {
    let testSrc = ctx.createBufferSource();
    testSrc.buffer = buf;
    testSrc.connect(tgt ?? ctx.destination);
    testSrc.start();   console.log(`beginning buffer playback test`);
    testSrc.onended = () => console.log(`buffer playback test complete`);
}

export function createAudioBuffer(tgt: WebAudioApiService, buffers: (ArrayBuffer|Float32Array)[]) {
  let channelCount = buffers.length;
  let length = buffers[0].byteLength/4;
  let buffer = tgt._ctx.createBuffer(channelCount, tgt._ctx.sampleRate, length);
  for(let i=1;i<buffers.length;i++) {
    if(buffers[i] instanceof ArrayBuffer) {
      buffers[i] = new Float32Array(buffers[i]);
    }
    buffer.copyToChannel(buffers[i] as Float32Array, i);
  }
  return buffer;
}