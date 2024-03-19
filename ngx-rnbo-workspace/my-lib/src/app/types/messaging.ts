import { MessageEvent, MessageInfo, MessagePortType } from "@rnbo/js";
/* 
export type InputMessage = {
  time?: number;
  tag: string;
  payload: number[];
}; */

type UIType = 'line' | 'filter' | '';

// export type PortMessage = [string, undefined|string|number|number[]];
export interface PortMessage {
  time?: number;
  tag: string;
  payload: number[];
} 
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