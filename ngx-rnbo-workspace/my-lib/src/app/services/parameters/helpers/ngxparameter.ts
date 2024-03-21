import { FormControl } from "@angular/forms";
import { INgxParameter } from "../../../types/parameter";
import { IEventSubscription } from "@rnbo/js";
import { BehaviorSubject, Subscription } from "rxjs";
import { computed, model, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";

export class NgxParameter {

    isLinked = new BehaviorSubject<boolean>(false);
    sig = signal<INgxParameter|null>(null);
    formControl = new FormControl<number>(0, {nonNullable: true});
    normalizedValue = signal<number>(0);
    denormalizedValue = computed<number>(() => this.denormalize(this.normalizedValue()));
    valueLabel = computed<string>(() => `${this.denormalizedValue().toFixed(this.precision())}${this.unit()}`);

    changeSubscription!: IEventSubscription;
    controlSubscription!: Subscription;
    
    min = computed<number>(() => this.sig()?.min??0);
    max = computed<number>(() => this.sig()?.max??1);

    precision = computed<number>(() => this.sig()?.meta?.precision??2);
    step = computed<number>(() => (1/(this.sig()?.steps??101)-1));

    discrete = computed<boolean>(() => this.sig()?.meta?.discrete??true);
    showTickMarks = computed<boolean>(() => this.sig()?.meta?.showTickMarks??false);

    enumValues = computed<string[]>(() => this.sig()?.enumValues??[]);
    uiType = computed<string>(() => this.sig()?.flags?.isEnum?this.sig()?.meta?.uiType??'select':'slider');
    unit = computed<string>(() => this.sig()?.unit??'');
    constructor(param: INgxParameter) { 
            this.param = param;
    }
    set param(p: INgxParameter) {
        this.sig.set(p);
        this.linkToControl();
    }
    linkToControl() {
        this.reset();
        this.changeSubscription = this.sig().changeEvent.subscribe((v: number) => {
            this.formControl.setValue(this.normalize(v));
            this.normalizedValue.set(v);
          });
          this.controlSubscription = this.formControl.valueChanges.subscribe((v: number) => {
            this.sig().normalizedValue = v
            this.normalizedValue.set(v);
          });
          this.isLinked.next(true);
    }
    reset() {
      this.isLinked.next(false);
      this.changeSubscription?.unsubscribe();
      this.controlSubscription?.unsubscribe();
    }
  denormalize(v: number) {
    return this.sig()?.convertFromNormalizedValue(v)??v;
  }
  normalize(v: number) {
    return this.sig()?.convertToNormalizedValue(v)??v;
  }
  formatLabel(normalizedValue: number) {
    console.log(`formatting label for ${normalizedValue} into denormalized ${this.denormalize(normalizedValue)} with precision ${this.precision()} and unit ${this.sig().unit??''}`);
    return `${this.sig().unit??''}${this.denormalize(normalizedValue).toFixed(this.precision())}`;
  }
}