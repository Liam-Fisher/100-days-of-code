import { Injectable, signal } from '@angular/core';
import { AudioGraph } from '../../types/audio';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  isLoaded = signal<boolean>(false);
  context = new AudioContext();
  gain_in!: GainNode;
  gain_out!: GainNode;
  gain_smooth = 0.01; // in seconds
  nodes: Map<string, AudioNode> = new Map();
  connections: AudioGraph = new Map();
  constructor() { }
}
