
// multibuffers are not written too since they contain no unique data, and are a device-local structure for organizing buffers
// Float64Buffers can also be ignored, since they treated as Float32Buffers by RNBO
type BufferType = 'Float64MultiBuffer '| 'Float32MultiBuffer' | 'Float32Buffer' | 'Float64Buffer' ;
type BufferTag = 'buffer'|'buffer~'|'data';

export type TaggedDataRef = {
    url?: string;
    file?: string;
    tag?: string; // multibuffers do not have a tag property, which we can use to exclude them,
    id: string;
    type: string;
}
export type NgxBuffer = {
    id: string;
    src: string;
    tag: string|BufferTag;
    buffer: AudioBuffer;
}

export type HiddenRef = {
    tag?: BufferTag|string;
    type: BufferType|string;
}
export type HiddenRefStorage = Map<string, HiddenRef>; // type !== 'Float32Buffer'
export type BufferStorage = Map<string, NgxBuffer>; 
