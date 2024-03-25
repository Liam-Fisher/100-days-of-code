import { MessageEvent, MessageInfo, MessagePortType } from "@rnbo/js";
/* 
export type InputMessage = {
  time?: number;
  tag: string;
  payload: number[];
}; */
export type PortType = 'in' | 'out';
type UIType = 'line' | 'filter' | '';

// export type PortMessage = [string, undefined|string|number|number[]];
export interface IPortMessage {
  time?: number;
  tag: string;
  payload: number[]|number|string|undefined;
} 
export type PortMessage = [ time: number, tag: string, payload: number[]];
export interface NgxPortInfo {
  index?: number;
  tag: string;
  type: MessagePortType;
  meta: PortMeta;
}
export type PortMeta = any & {
  hint?: string;
  intType?: boolean;
  floatType?: boolean;
  minElements?: number;
  maxElements?: number;
  minValue?: number;
  maxValue?: number;
  icon?: string;
};