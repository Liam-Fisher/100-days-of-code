import { AudioService } from "../audio.service";

export async function createInputNode(this: AudioService) {
  let src_node = this.src_node;
  let validSrc = src_node instanceof AudioNode && src_node?.numberOfOutputs && src_node?.context === this.ctx;
  if(!validSrc) {
      try {
        const userMicrophone = await navigator.mediaDevices.getUserMedia({ audio: true });
        src_node = this.ctx.createMediaStreamSource(userMicrophone);
      }
      catch(e) {
        throw new Error(`could not find input node and could not access user audio input`);
      }
  }
  this.src_node = src_node;
}


export async function createOutputNode(this: AudioService) {
  let dest_node = this.dest_node;
  let validDest = dest_node instanceof AudioNode && dest_node?.numberOfInputs && dest_node?.context === this.ctx;
    if(!validDest) {
      try {
        const userSpeaker = this.ctx.destination;
        dest_node = userSpeaker;
      }
      catch(e) {
        throw new Error(`could not find output node and could not access user audio output`);
      }
  }
  this.dest_node = dest_node;
}


/* 
export async function createInputNode(this: AudioService, src_node?: AudioNode|null) {
    src_node ??= this.src_node;
    let validSrc = src_node instanceof AudioNode && src_node?.numberOfOutputs && src_node?.context === this.ctx;
    if(!validSrc) {
        try {
          const userMicrophone = await navigator.mediaDevices.getUserMedia({ audio: true });
          src_node = this.ctx.createMediaStreamSource(userMicrophone);
        }
        catch(e) {
          throw new Error(`could not find input node and could not access user audio input`);
        }
    }
    this.src_node = src_node;
}


export async function createOutputNode(this: AudioService, dest_node?: AudioNode|null) {
    dest_node ??= this.dest_node;
    let validDest = dest_node instanceof AudioNode && dest_node?.numberOfInputs && dest_node?.context === this.ctx;
      if(!validDest) {
        try {
          const userSpeaker = this.ctx.destination;
          dest_node = userSpeaker;
        }
        catch(e) {
          throw new Error(`could not find output node and could not access user audio output`);
        }
    }
    this.dest_node = dest_node;
}
 */


