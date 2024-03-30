export type TimingType = 'transport'|'beattime'|'tempo'|'timeSignature';
export interface TransportMesssage {
    type: 'transport';
    timeTill?: number;
    data: boolean;
}
export interface BeatTimeMesssage {
    type: 'beattime';
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
export type TimingAction = TransportMesssage|BeatTimeMesssage|TempoMesssage|TimeSignatureMesssage;