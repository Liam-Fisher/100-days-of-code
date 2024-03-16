import { BehaviorSubject } from "rxjs";
import { WebAudioApiService } from "../web-audio-api.service";

export function load(tgt: WebAudioApiService) {
    try {
      if (!tgt.isLoaded.value) {
        if (!tgt._ctx) {
          tgt._ctx ??= new AudioContext();
        }
        if (tgt._ctx?.state !== 'running') {
            tgt._ctx.resume();
        }
        tgt.nodes.set('out', tgt.dac);
        tgt.isLoaded.next(true);
      }
    } catch (err) {
      tgt.isLoaded.next(false);
      console.log(`error getting audio context`);
      console.log(err);
    }
}
export async function toggle(tgt: WebAudioApiService)  {
    try {
      if (!tgt.isLoaded.value) {
        tgt._ctx ??= new AudioContext();
        await tgt._ctx.resume();
        tgt.nodes.set('out', tgt._ctx.destination);
      }
      else {
        await tgt._ctx.close();
        tgt.isLoaded.next(false);
      }
  }
  catch (err) {
    tgt.isLoaded.next(false);
    console.log(`error getting audio context`);
    console.log(err);
    }
  }