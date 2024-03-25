import { IPreset } from "@rnbo/js";


export type PresetMeta = any;

export type NgxPreset = IPreset; // may add to this??

export type PresetMap = Map<string, NgxPreset>;

export type PresetActionMode = 'create'|'update'|'delete'|'load';

// Copilot suggested these... doubt I'll find the time to implement them
// 'save'|'rename'|'duplicate'|'export'|'import'|'clear'|'reset'|'undo'|'redo'|'copy'|'paste'|'cut'|'select'|'deselect'|'move'|'copyTo'|'moveTo'|'deleteFrom'|'saveTo'|'loadFrom'|'exportTo'|'importFrom'|'clearFrom'|'resetFrom'|'undoFrom'|'redoFrom'|'copyFrom'|'pasteFrom'|'cutFrom'|'selectFrom'|'deselectFrom'|'moveFrom'|'createFrom'|'updateFrom'|'deleteFrom'|'renameFrom'|'duplicateFrom'|'exportFrom'|'importFrom'|'clearFrom'|'resetFrom'|'undoFrom'|'redoFrom'|'copyFrom'|'pasteFrom'|'cutFrom'|'selectFrom'|'deselectFrom'|'moveFrom'|'createFrom'|'updateFrom'|'deleteFrom'|'renameFrom'|'duplicateFrom'|'exportFrom'|'importFrom'|'clearFrom'|'resetFrom'|'undoFrom'|'redoFrom'|'copyFrom'|'pasteFrom'|'cutFrom'|'selectFrom'|'deselectFrom'|'moveFrom'|'createFrom'|'updateFrom'|'deleteFrom'|'renameFrom'|'duplicateFrom'|'exportFrom'|'importFrom'|'clearFrom'|'resetFrom'|'undoFrom'|'redoFrom'|'copyFrom'|'pasteFrom'|'cutFrom'|'selectFrom'|'deselectFrom'|'moveFrom'|'createFrom'|'updateFrom'|'deleteFrom'|'renameFrom'|'duplicateFrom'|'exportFrom'|'importFrom'|'clearFrom'|'resetFrom'|'undoFrom'|'redoFrom'|'copyFrom'|'pasteFrom'|'cutFrom'|'selectFrom'|'deselectFrom'|'moveFrom'|'createFrom'|'updateFrom'|'deleteFrom'|'renameFrom'|'duplicateFrom'|'exportFrom'|'importFrom'|'clearFrom'|'resetFrom'|'undoFrom'|'redoFrom'|'copyFrom'|'pasteFrom'|'cutFrom'|'selectFrom'|'deselectFrom'|'moveFrom'|'createFrom'|'updateFrom'|'deleteFrom'|'renameFrom'|'duplicateFrom'|'exportFrom'|'importFrom'|'clearFrom'|'resetFrom'|'undo

export interface PresetAction {
    mode: PresetActionMode;
    presetID: string;
}



