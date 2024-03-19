import { computed, signal } from "@angular/core";

async function exFunc(num: number) {
    await new Promise((resolve) => setTimeout(resolve, num));
    const currentTimeInSeconds = Math.floor(Date.now());
    return currentTimeInSeconds;
}
const sig = signal<number>(0);
 