
// multibuffers are not written too since they contain no unique data, and are a device-local structure for organizing buffers
// Float64Buffers can also be ignored, since they treated as Float32Buffers by RNBO
export type BufferType = 'Float64MultiBuffer '| 'Float32MultiBuffer' | 'Float32Buffer' | 'Float64Buffer' ;
export type BufferTag = 'buffer'|'buffer~'|'data'|'multibuffer~';
export type VisbililtyLevel = 'Application'|'Library'|'Device';
export type SrcType = 'url'|'file'|'device'|'data'|'none';
export type TaggedDataRef = {
    url?: string;
    file?: string;
    id: string;
    tag: string|BufferTag; // multibuffers do not have a tag property, which we can use to exclude them,
    type: string|BufferType;
}
export type BufferEditMethod = 'read'|'write'|'link'|'unlink';
// |'delete'|'create'|'copy'|'move'|'rename'|'setTag'|'setType'|'setSrcType'|'setHidden'|'setFixedLength'|'setSelectedChannelIndex'|'decrementChannel'|'incrementChannel'|'setChannels'|'setLength'|'checkBuffer;


export interface BufferEdit<M extends BufferEditMethod> {
    method: BufferEditMethod;
}