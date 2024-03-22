import { Component, ElementRef, HostListener, Renderer2, ViewChild, computed, effect, inject, input, signal, untracked } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {  MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'buffer-ui',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatButtonModule],
  template: `
  <svg #svgDisplay width="100%" [attr.height]="height()">
    <path [attr.d]="displayPath()" fill="none" stroke="blue" stroke-width="1"/>
  </svg>
  `,
  styles: ``
})
export class TestBufferUiComponent {

  @ViewChild('svgDisplay') svgDisplay!: ElementRef<SVGElement>;
  renderer = inject(Renderer2);
  inputData = input.required<Float32Array>();
  localData = (new Float32Array(128)).map((_, i) => Math.sin((i / 4)*Math.PI));
  height = signal<number>(200);
  width = signal<number>(1000);
  startWindow = signal<number>(0);
  endWindow = signal<number>(127);
  startSample = computed<number>(()=> Math.floor(this.startWindow()));
  endSample = computed<number>(() => Math.ceil(this.endWindow()));
  samplesDisplayed = computed(() => (this.endSample() - this.startSample())+1);
  pathStep = computed(() => this.width() / (this.endSample() - this.startSample()));
  isDirty = signal<boolean>(false);
  displayPath = signal<string>(`M 0 ${this.height() / 2}`);
  pointerDown = signal<boolean>(false);
  pointerX = 0;
  constructor() {
    effect(() => {
      if(this.isDirty()) {
        this.isDirty.set(false);
        this.displayPath.set(this.generatePath());
      }
    }, {allowSignalWrites: true});
  }
  generatePath() {
    let pathData = `M 0 ${this.height() / 2}`;
    for (let i = 0; i < this.samplesDisplayed(); i++) {
      pathData += ` L ${this.pathStep()*i} ${this.height() * (1-this.localData[(this.startSample()+i)]) * 0.5}`;
    }
    return pathData;
  }
  ngAfterViewInit() {
    this.updateDims();
    this.isDirty.set(true);
    console.log(`input data`, this.inputData());
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
  @HostListener('wheel', ['$event'])
  onWheelEvent(event: WheelEvent) {
    if(event.target === this.svgDisplay.nativeElement) {
    event.preventDefault();
    let direction = event.deltaY > 0 ? -1 : 1;
    this.zoom(event.offsetX/this.width(), direction);
    console.log(`wheel ${direction} at ${event.offsetX}`);
    }
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
      this.isDirty.set(true);
      console.log(`start: ${this.startSample()}, end: ${this.endSample()}`);
    }
  @HostListener('pointermove', ['$event'])
  onPointerMove(event: PointerEvent) {
    if(event.buttons && event.target === this.svgDisplay.nativeElement) {
        this.draw(event.offsetX, event.offsetY);
    }
  }
  draw(x: number, y: number) {
    let sample = Math.round(x / this.width())*(this.endSample() - this.startSample()) + this.startSample();
    let amplitude = 1 - (y / this.height()) * 2;
    console.log(`draw at sample: ${sample}, amp: ${amplitude}`);
    console.log(`current value ${this.localData[sample]}`);
    this.localData[sample] = amplitude;
    this.isDirty.set(true);
    console.log(`new value ${this.localData[sample]}`);
  }
}
