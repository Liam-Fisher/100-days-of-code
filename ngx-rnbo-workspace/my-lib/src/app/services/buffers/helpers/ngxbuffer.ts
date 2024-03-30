import { BaseDevice, DataBuffer } from "@rnbo/js";
import { BufferTag, BufferType,  SrcType, TaggedDataRef, VisbililtyLevel } from "../../../types/buffers";
import { NgxDevice } from "../../../types/device";
import { EventEmitter, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export class NgxBuffer {
    readonly defaultData = [new Float32Array([-1, 0, 1, 0])] as Float32Array[];
    readonly ref: TaggedDataRef;
    readonly ctx: AudioContext;
    readonly id: string;
    url?: string;
    file?: string;
    
    srcType!: SrcType;

    tag: BufferTag;
    type: BufferType;
    obj: AudioBuffer|null = null;
    
    sampleRate!: number;
    hidden!: boolean;
    fixedLength!: boolean;

    constructor(ref: TaggedDataRef, ctx: AudioContext) {

        this.ref = ref;
        this.ctx = ctx;
        this.id = ref.id;

        this.type = ref.type as BufferType;
        this.hidden = this.type !== 'Float32Buffer';
        
        this.tag = (ref.tag??'multibuffer~') as BufferTag;
        this.fixedLength = this.tag === 'data';
        
        [this.url, this.file] = [ref.url, ref.file];
        this.srcType = this.hidden?'none':this.url?'url':this.file?'file':this.fixedLength?'data':'device';
        this.sampleRate = ctx.sampleRate;
    }
    get channels() {
        return this.obj?.numberOfChannels??0;
    }
    get length() {
        return this.obj?.length??0;
    }
    checkDims(data: Float32Array[]) {
        try {
            if(!this.obj) throw new Error('no buffer to write to');
            if(data.length !== this.channels) throw new Error('data length does not match buffer channels');
            if(data[0].length !== this.length) throw new Error('data length does not match buffer length');
        }
        catch(e) {
            console.error(e);
            return false;
        }
        return true;
    }
    copyToChan(src: Float32Array, channel: number, offset = 0) {
        this.obj?.copyToChannel(src, channel, offset);
    }
    copyFromChan(tgt: Float32Array, channel: number, offset = 0) {
        this.obj?.copyFromChannel(tgt, channel, offset);
    }
    readChan(channel: number) {
        return this.obj?.getChannelData(channel);
    }
    copyToAudio(src: Float32Array[]) {
        if(!this.checkDims(src)) return false;
        src.forEach((el, i) => this.copyToChan(el, i));
        return true;
    }
    copyFromAudio(tgt: Float32Array[]) {
        if(!this.checkDims(tgt)) return false;
        tgt.forEach((el, i) => this.copyFromChan(el, i));
        return true;
    }   
    readAudioAsData() {
        const arrayBuffers: Float32Array[] = [];
        for(let i = 0; i < this.channels; i++) {
            let data = this.obj?.getChannelData(i);
            if(data) arrayBuffers.push(data);
        } 
        return arrayBuffers;
    }
    sampleWrite(sample: number, value: number, channel = 0) {
        this.obj!.getChannelData(channel)[sample] = value;
    }
    sampleRead(sample: number, channel = 0) {
        return this.obj?.getChannelData(channel)[sample];
    }
    setAudioToNull() {
        this.srcType = 'none';
        this.obj = null;
        return true;
    }
    createEmpty(length: number, channels: number) {
        this.srcType = 'empty';
        this.obj = this.ctx.createBuffer(channels, length, this.sampleRate);
    }
    setAudioFromData(data: Float32Array[]) {
        if(!data.length||!data[0].length) data = this.defaultData;
        if(!this.checkDims(data)) this.createEmpty(data[0].length, data.length);
        for(let i = 0; i < this.channels; i++) {
            this.obj?.getChannelData(i).set(data[i]);
        }
        return !!this.obj;
    }
    async setAudioFromUrl(url?: string) {
        this.url ??= url;
        if(this.url) {
            this.srcType = 'url';
            this.obj = (await BaseDevice.fetchAudioData(this.url, this.ctx))??null;
        }
        else {
            console.log(`no url provided and no url exists in ref, current source type is '${this.srcType}'`);
        }
        return !!this.obj;
    }
    async setAudioFromFile(file: File|null) {
        if(file) {
            this.file = file.name;
            this.srcType = 'file';
            this.obj = await this.ctx.decodeAudioData(await file.arrayBuffer());
        }
        else {
            console.log(`no file provided and no file exists in ref, current source type is '${this.srcType}'`);
        }
        return !!this.obj;
    }
    setAudioFromDataBuffer(dataBuffer: DataBuffer|null) {
        if(!dataBuffer?.buffer) return false;
        if(dataBuffer.buffer.byteLength) {
            this.srcType = 'device';
            this.obj = dataBuffer.getAsAudioBuffer(this.ctx);
            return !!this.obj;
        }
        else {
            this.srcType = 'empty';
            return this.setAudioFromData(this.defaultData);
        }
    }
    
}
