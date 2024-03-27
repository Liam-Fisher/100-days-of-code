export type TimingType = 'transport'|'beat'|'tempo'|'timeSignature';
export interface TransportMesssage {
    type: 'transport';
    timeTill?: number;
    data: boolean;
}
export interface BeatMesssage {
    type: 'beat';
    timeTill?: number;
    data: number;
}
export interface TempoMesssage {
    type: 'tempo';
    timeTill?: number;
    data: number;
}
export interface TimeSignatureMesssage {
    type: 'timeSignature';
    timeTill?: number;
    data: [number, number];
}
export type TimingMessage = TransportMesssage|BeatMesssage|TempoMesssage|TimeSignatureMesssage;