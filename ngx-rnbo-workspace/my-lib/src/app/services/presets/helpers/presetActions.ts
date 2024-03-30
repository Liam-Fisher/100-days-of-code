import { RnboPresetsService } from "../rnbo-presets.service";

export async function createPreset(this: RnboPresetsService) {
    let id = this.selectedId();
    if(!this.newId()) throw new Error(`Preset ${id} already exists. Please select another id or update the existing preset.`);
    let preset = this.setPreset(id, await this.getPreset());
    if(!preset) throw new Error(`Failed to get preset from device. Preset ${id} not created.`);
    this.isLoaded.set(false);
    return preset;
}

export async function updatePreset(this: RnboPresetsService) {
    let id = this.selectedId();
    let preset = this.setPreset(id, await this.getPreset());
    if(!preset) throw new Error(`Failed to get preset from device. Preset ${id} not updated.`);
    return preset;
  }
  export async function loadPreset(this: RnboPresetsService) {
    let id = this.selectedId();
    let preset = this.map.get(this.selectedId())??null;
    if(!preset) throw new Error(`Preset ${id} not found.`);
    this.device.sig()?.setPreset(preset);
    this.isLoaded.set(true);
    return preset;
  }

  export async function  deletePreset(this: RnboPresetsService) {
    let id = this.selectedId();
    let removed = this.map.delete(id);
    this.isLoaded.set(false);
    if(!removed) throw new Error(`Preset ${id} not found, nothing to remove.`);
    return id;
  }