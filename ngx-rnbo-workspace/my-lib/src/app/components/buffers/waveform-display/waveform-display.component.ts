import { Component, ElementRef, HostListener, Renderer2, ViewChild, computed, effect, inject, input, model, signal, untracked } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {  MatSelectModule } from '@angular/material/select';
import { RnboBufferService } from '../../../services/buffers/rnbo-buffer-service.service';
const defaultData = (new Float32Array(128)).map((_, i) => Math.sin((i/512)*Math.PI));
@Component({
  selector: 'ngx-buffer-waveform-display',
  standalone: true,
  imports: [],
  template: `
  <svg #svgDisplay [attr.width]="width()" [attr.height]="height()">
    <path [attr.d]="displayPath()" fill="none" stroke="blue" stroke-width="1"/>
  </svg>
  `,
  styles: ``
})
export class BufferWaveformDisplayComponent {

  @ViewChild('svgDisplay') svgDisplay!: ElementRef<SVGElement>;
  inputData = input<Float32Array|null>(null);
  
  dirty = model<boolean>(false);
  $dirty = effect(() => {
    if(this.dirty()) {
      this.displayPath.set(this.generatePath());
      this.dirty.set(false);
    }
  }, {allowSignalWrites: true});

  readonly defaultData = (new Float32Array(128)).map((_, i) => (i/64)-1);

  localData = computed<Float32Array>(() => this.inputData()??defaultData);
  $localData = effect(() => {
    let length = this.localData().length;
    this.startWindow.set(0);
    this.endWindow.set(length-1);
    this.dirty.set(true);
  }, {allowSignalWrites: true});
  
  height = signal<number>(200);
  width = signal<number>(1000);

  startWindow = signal<number>(0);
  endWindow = signal<number>(127);

  startSample = computed<number>(()=> Math.floor(this.startWindow()));
  endSample = computed<number>(() => Math.ceil(this.endWindow()));

  samplesDisplayed = computed(() => (this.endSample() - this.startSample())+1);
  pathStep = computed(() => this.width() / (this.endSample() - this.startSample()));
  displayPath = signal<string>(`M 0 ${this.height() / 2}`);

  constructor() {}
  generatePath() {
    let pathData = `M 0 ${this.height() / 2}`;
    const data = this.localData();
    for (let i = 0; i < this.samplesDisplayed(); i++) {
      pathData += ` L ${this.pathStep()*i} ${this.height() * (1-data[(this.startSample()+i)]) * 0.5}`;
    }
    return pathData;
  }
  ngAfterViewInit() {
    this.updateDims();
    this.dirty.set(true);
    const data = this.localData();
    console.log(`input data`, data);
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateDims();
  }
  updateDims() {
    this.width.set(this.svgDisplay.nativeElement.clientWidth);
    this.height.set(this.svgDisplay.nativeElement.clientHeight);
    console.log('width', this.width()); 
  }
  zoom(scaledTarget: number, direction: number) {
    console.log(`zomming ${direction} at ${scaledTarget}`);
      let start = this.startWindow();  
      let end = this.endWindow();
      start = Math.min(end-1, start + scaledTarget*direction);
      start = Math.max(0, start);
      end = Math.max(start+1, end - scaledTarget*direction);
      end = Math.min(this.localData.length, end);
      this.startWindow.set(start);
      this.endWindow.set(end);
      this.dirty.set(true);
      console.log(`start: ${this.startSample()}, end: ${this.endSample()}`);
  }
}
