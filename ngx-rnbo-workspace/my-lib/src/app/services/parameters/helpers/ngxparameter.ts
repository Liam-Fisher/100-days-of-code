import { FormControl } from "@angular/forms";
import { INgxParameter } from "../../../types/parameter";
import { IEventSubscription } from "@rnbo/js";
import { BehaviorSubject, Subscription, filter, map } from "rxjs";
import { computed,  signal } from "@angular/core";

export class NgxParameter {

    isLinked = new BehaviorSubject<boolean>(false);
    sig = signal<INgxParameter|null>(null);
    
    normalizedValue = signal<number>(0);
    denormalizedValue = computed<number>(() => this.denormalize(this.normalizedValue()));

    valueLabel = computed<string>(() => `${this.denormalizedValue().toFixed(this.precision())}${this.unit()}`);

    inputSubject = new BehaviorSubject<number>(0); //this is denormalized
    formControl = new FormControl<number>(0, {nonNullable: true}); // this is normalized
   
    $changeEvent!: IEventSubscription;
    $formControl!: Subscription;
    $inputSubject!: Subscription;
    externalSubjectSubscriptions: Subscription[] = [];

    min = computed<number>(() => this.sig()?.min??0);
    max = computed<number>(() => this.sig()?.max??1);

    precision = computed<number>(() => this.sig()?.meta?.precision??2);
    step = computed<number>(() => (1/(this.sig()?.steps??101)-1));

    discrete = computed<boolean>(() => this.sig()?.meta?.discrete??true);
    showTickMarks = computed<boolean>(() => this.sig()?.meta?.showTickMarks??false);

    enumValues = computed<string[]>(() => this.sig()?.enumValues??[]);
    uiType = computed<string>(() => this.sig()?.flags?.isEnum?this.sig()?.meta?.uiType??'select':'slider');
    unit = computed<string>(() => this.sig()?.unit??'');

    constructor() { }
    subscribe(Fn: (v: number) => void) {
        this.sig().changeEvent.subscribe(Fn);
    }
    linkControl() {   
        this.$inputSubject = this.inputSubject.subscribe((v: number) => {
          this.normalizedValue.set(this.normalize(v));
          this.formControl.setValue(v);
        });

        this.$changeEvent = this.sig().changeEvent.subscribe((v: number) => {
            this.formControl.setValue(this.normalize(v));
            if(this.inputSubject.value !== v) {
              this.inputSubject.next(v);
            }
        });

        this.$formControl = this.formControl.valueChanges.subscribe((v: number) => {
          this.normalizedValue.set(v);  
          this.sig().normalizedValue = v;
          if(this.inputSubject.value !== v) {
            this.inputSubject.next(v);
          }
        });

        this.isLinked.next(true);

        return this;  
    }
    unlinkControl() {
      this.isLinked.next(false);
      this.$changeEvent?.unsubscribe();
      this.$formControl?.unsubscribe();
      this.$inputSubject?.unsubscribe();
      return this;
    }
    unlinkExternalSubjects() {
      while(this.externalSubjectSubscriptions.length){
        this.externalSubjectSubscriptions.pop()?.unsubscribe();
      }
    }
    // normalized tells us if the external subject is normalized,
    // this means we need to denormalize the normalized value emitted by the external subject
    // and normalize the denormalized value emitted by the input subject
    // might do something similar with enum values to allow string inputs
    linkExternalSubject(outputSubject: BehaviorSubject<number>, normalized = false) {

      const mapInFn = (v: number) => normalized?this.normalize(v):v;
      const mapOutFn = (v: number) => normalized?this.denormalize(v):v;
      const filterFn = (v: number) => v !== this.inputSubject.value;

      const inputSubscription = this.inputSubject
          .pipe(map(mapInFn), filter(filterFn))
          .subscribe((v: number) => outputSubject.next(v));
      const outputSubscription = outputSubject
          .pipe(map(mapOutFn), filter(filterFn))
          .subscribe((v: number) => this.inputSubject.next(v));

      this.externalSubjectSubscriptions.push(inputSubscription, outputSubscription);

      return this;
    }
    getEnumValue(index: number) {
      return this.enumValues()[index];
    }
    getEnumIndex(value: string) {
      return this.enumValues().indexOf(value);
    }
  denormalize(v: number): number {
    return this.sig()?.convertFromNormalizedValue(v)??v;
  }
  normalize(v: number): number {
    return this.sig()?.convertToNormalizedValue(v)??v;
  }
  formatLabel(normalizedValue: number) {
    console.log(`formatting label for ${normalizedValue} into denormalized ${this.denormalize(normalizedValue)} with precision ${this.precision()} and unit ${this.sig().unit??''}`);
    return `${this.sig().unit??''}${this.denormalize(normalizedValue).toFixed(this.precision())}`;
  }
}