import { computed, model, signal } from "@angular/core";


const baseLatency = signal<number>(0);
const outputLatency = signal<number>(0);
const latency = computed<number>(() => baseLatency() + outputLatency());

const src_node = signal<AudioNode|null>(null);
const dest_node = signal<AudioNode|null>(null);

const gain_in = signal<number>(0);
const gain_out = signal<number>(0);

const ctx_state = signal<'running'|'suspended'|'closed'>('closed');

export { gain_in, gain_out,src_node,dest_node, baseLatency, outputLatency, latency, ctx_state };
