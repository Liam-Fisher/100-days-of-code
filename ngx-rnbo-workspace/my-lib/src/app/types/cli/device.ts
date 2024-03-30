import { DeviceMeta, NgxDevice } from "../device";

export type DeviceAction = 'create' | 'target' | 'query';


/**
 * CreateDeviceCommand interface.
 * 
 * This is used to create and initialize a device from a loaded patcher.
 * 
 * @param source - The id of a loaded patcher export.json file.
 * @param name - The name of the device to create, if not provided, the device will be named after the patcher.
 * @param overwrite - If true, the device will invalidate an existing device with the same name, replacing it 
 */


export interface CreateDeviceCommand {
    action: 'create';
    source: string;
    name?: string; 
    overwrite?: boolean;
}


/**
 * TargetDeviceCommand interface.
 * 
 * This is used to target a device for subsequent commands.
 * 
 * @param name - The name of the device to target.
 */
export interface TargetDeviceCommand {
    action: 'target';
    name: string;
}

/**
 * QueryDeviceCommand interface.
 * 
 * This is used to query a device for information.
 * 
 * @param name - The name of the device to query, if not provided, the target device will be queried.
 * @param prop - The property of the device to query, if not provided, the meta object will be returned.
 */

export interface QueryDeviceCommand {
    action: 'query';
    name?: string;
    prop?: keyof DeviceMeta;
}



export interface IDeviceControl {
    devices: Map<string, NgxDevice>;
    target?: NgxDevice;
}