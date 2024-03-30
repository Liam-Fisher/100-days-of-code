
// multibuffers are not written too since they contain no unique data, and are a device-local structure for organizing buffers
// Float64Buffers can also be ignored, since they treated as Float32Buffers by RNBO
export type BufferType = 'Float64MultiBuffer '| 'Float32MultiBuffer' | 'Float32Buffer' | 'Float64Buffer' ;
export type BufferTag = 'buffer'|'buffer~'|'data'|'multibuffer~';
export type VisbililtyLevel = 'Application'|'Library'|'Device';
export type SrcType = 'url'|'file'|'device'|'data'|'none'|'empty';
export type TaggedDataRef = {
    url?: string;
    file?: string;
    id: string;
    tag: string|BufferTag; // multibuffers do not have a tag property, which we can use to exclude them,
    type: string|BufferType;
}
export type BufferActionMode = 'read'|'write';

// methods can be read or write, and the target can be a buffer id, a channel number, or a sample number


export interface BufferAction {
    mode: BufferActionMode;
    target: {
        id: string;
        channel?: number;
        offset?: number;
    }
    value?: Float32Array|Float32Array[];
}
