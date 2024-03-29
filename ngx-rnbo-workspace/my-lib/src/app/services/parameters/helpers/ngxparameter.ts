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

    valueLabel = computed<string>(() => `${this.denormalizedValue().toFixed(this.precision)}${this.unit}`);

    inputSubject = new BehaviorSubject<number>(0); //this is denormalized
    formControl = new FormControl<number>(0, {nonNullable: true}); // this is normalized
   
    $changeEvent!: IEventSubscription;
    $formControl!: Subscription;
    $inputSubject!: Subscription;
    externalSubjectSubscriptions: Subscription[] = [];
/* 
    min = computed<number>(() => this.sig()?.min??0);
    max = computed<number>(() => this.sig()?.max??1);

    precision = computed<number>(() => this.sig()?.meta?.precision??2);
    step = computed<number>(() => (1/(this.sig()?.steps??101)-1));

    discrete = computed<boolean>(() => this.sig()?.meta?.discrete??true);
    showTickMarks = computed<boolean>(() => this.sig()?.meta?.showTickMarks??false);

    enumValues = computed<string[]>(() => this.sig()?.enumValues??[]);
    uiType = computed<string>(() => this.sig()?.flags?.isEnum?this.sig()?.meta?.uiType??'select':'slider');
    unit = computed<string>(() => this.sig()?.unit??''); 
    */
   id: string;
    min: number;
    max: number;
    precision: number;
    step: number;
    enumValues: string[];
    unit: string;
    uiType: string;
    private obj: INgxParameter;
    constructor(p: INgxParameter, private debug = false) { 
      console.log(`creating parameter ${p.address.id}`);
      this.obj = p;
      this.id = p.address.id;
      this.min = p.min;
      this.max = p.max;
      this.precision = p.meta?.precision??2;
      this.step = 1/(p.steps-1);
      this.enumValues = p.enumValues;
      this.unit = p.unit;
      this.uiType = p?.meta?.uiType??p?.flags?.isEnum?'select':'slider';

      this.linkControl();
    }
    subscribe(Fn: (v: number) => void) {
        this.obj.changeEvent.subscribe(Fn);
    }
    linkControl() {   
        this.$inputSubject = this.inputSubject.subscribe((v: number) => {
          let normalized = this.normalize(v);
          this.obj.value = v;
          this.normalizedValue.set(normalized);
          if(this.formControl.value !== normalized){
              this.formControl.setValue(normalized);
              if(this.debug) {
                console.log(`${this.id}: subject ${v} -> control ${this.normalize(v)}`);
              }
            }
        });
        
        this.$formControl = this.formControl.valueChanges.subscribe((v: number) => {
          this.normalizedValue.set(v);  
          this.obj.normalizedValue = v;
          if(this.inputSubject.value !== this.denormalize(v)) {
            this.inputSubject.next(this.denormalize(v));  
            if(this.debug){
              console.log(`${this.id}: control ${v} -> subject ${this.normalize(v)}`);
            }
          }
        });

        this.$changeEvent = this.obj.changeEvent.subscribe((v: number) => {
          let normalized = this.normalize(v);
          this.normalizedValue.set(normalized);
          if(this.inputSubject.value !== v) {
            this.inputSubject.next(v);
            if(this.debug) {
              console.log(`${this.id}: object ${v} -> subject ${this.normalize(v)}`);
            }
          }
          if(this.formControl.value !== normalized){
            this.formControl.setValue(normalized);
            if(this.debug) {
                console.log(`${this.id}: subject ${v} -> control ${this.normalize(v)}`);
              }
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
      return this;
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
    getEnumValue(index: number): string {
      return this.enumValues?.[index]??'';
    }
    getEnumIndex(value: string): number {
      return this.enumValues.indexOf(value);
    }
  denormalize(v: number): number {
    return this.obj?.convertFromNormalizedValue(v)??v;
  }
  normalize(v: number): number {
    return this.obj?.convertToNormalizedValue(v)??v;
  }
  formatLabel(normalizedValue: number) {
    if(this.debug) {
      console.log(`formatting label for ${normalizedValue} into denormalized ${this.denormalize(normalizedValue)} with precision ${this.precision} and unit ${this.unit??''}`);
    }
    return `${this.unit??''}${this.denormalize(normalizedValue).toFixed(this.precision)}`;
  }
}