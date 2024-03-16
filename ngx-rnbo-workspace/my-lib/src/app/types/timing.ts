export type TimingType = 'transport'|'beat'|'tempo'|'timeSignature';
export interface TimingMesssage {
    type: TimingType;
    time: number;
    data: boolean|number|[number, number];
}