import { BaseDevice, DataBuffer } from "@rnbo/js";
import { BufferTag, BufferType,  SrcType, TaggedDataRef, VisbililtyLevel } from "../../../types/buffers";
import { NgxDevice } from "../../../types/device";
import { EventEmitter, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export class NgxBuffer {
    
    readonly ref: TaggedDataRef;
    readonly ctx: AudioContext;
    readonly id: string;
    inputSubject = new BehaviorSubject<Float32Array[]>([]);
    url?: string;
    file?: string;
    
    srcType!: SrcType;

    tag: BufferTag;
    type: BufferType;
    buffer: AudioBuffer|null = null;
    
    sampleRate!: number;
    hidden!: boolean;
    fixedLength!: boolean;
    selectedChannelIndex = signal<number>(1);

    constructor(ref: TaggedDataRef, ctx: AudioContext, alias?: string) {

        this.ref = ref;
        this.ctx = ctx;
        this.id = alias??ref.id;

        this.type = ref.type as BufferType;
        this.hidden = this.type !== 'Float32Buffer';
        
        this.tag = (ref.tag??'multibuffer~') as BufferTag;
        this.fixedLength = this.tag === 'data';
        
        [this.url, this.file] = [ref.url, ref.file];
        this.srcType = this.hidden?'none':this.url?'url':this.file?'file':this.fixedLength?'data':'device';

    }
    decrementChannel() {
        let channel = this.selectedChannelIndex();
        this.selectedChannelIndex.set(Math.max(1, channel- 1));
    }
    incrementChannel() {
        let channel = this.selectedChannelIndex();
        this.selectedChannelIndex.set(Math.min(this.channels, channel + 1));
    }
    get channels() {
        return this.buffer?.numberOfChannels??0;
    }
    get length() {
        return this.buffer?.length??0;
    }
    checkBuffer(data: Float32Array[]) {
        if(!this.buffer) throw new Error('no buffer to write to');
        if(data.length !== this.channels) throw new Error('data length does not match buffer channels');
        if(data[0].length !== this.length) throw new Error('data length does not match buffer length');
        return true;
    }
    copyToAudio(src: Float32Array[]) {
        this.checkBuffer(src);
        for(let i = 0; i < this.channels; i++) { 
            this.buffer?.copyToChannel(src[i], i);
        }
    }
    copyFromAudio(tgt: Float32Array[]) {
        this.checkBuffer(tgt);
        for(let i = 0; i < this.channels; i++) { 
            tgt.forEach((el, i) => this.buffer!.copyFromChannel(el, i));
        }
    }
    readChannelData(channel: number) {
        return this.buffer?.getChannelData(channel);
    }
    readAudioData() {
        const arrayBuffers: Float32Array[] = [];
        for(let i = 0; i < this.channels; i++) {
            arrayBuffers.push(this.buffer?.getChannelData(i)??new Float32Array());
        } 
        return arrayBuffers;
    }
    sampleWrite(sample: number, value: number, channel = 0) {
        this.buffer!.getChannelData(channel)[sample] = value;
    }
    sampleRead(sample: number, channel = 0) {
        return this.buffer?.getChannelData(channel)[sample];
    }
    setAudioToNull() {
        this.srcType = 'none';
        this.buffer = null;
    }
    async setAudioFromData(data: Float32Array[]) {
        this.srcType = 'data';
        this.buffer = this.ctx.createBuffer(data.length, data[0].length, this.sampleRate);
        for(let i = 0; i < this.channels; i++) {
            this.buffer?.getChannelData(i).set(data[i]);
        }
    }
    async setAudioFromUrl(url?: string) {
        this.url ??= url;
        if(this.url) {
            this.srcType = 'url';
            this.buffer = (await BaseDevice.fetchAudioData(this.url, this.ctx))??null;
        }
        else {
            console.log(`no url provided and no url exists in ref, current source type is '${this.srcType}'`);
        }
    }
    async setAudioFromFile(file: File|null) {
        if(file) {
            this.file = file.name;
            this.srcType = 'file';
            this.buffer = await this.ctx.decodeAudioData(await file.arrayBuffer());
        }
        else {
            console.log(`no file provided and no file exists in ref, current source type is '${this.srcType}'`);
        }
    }
    async setAudioFromDataBuffer(dataBuffer: DataBuffer|null) {
        if(!dataBuffer) return;
        this.srcType = 'device';
        this.buffer = dataBuffer.getAsAudioBuffer(this.ctx);
    }
    
}
