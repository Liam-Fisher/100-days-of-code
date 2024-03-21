import { WritableSignal, effect, untracked } from "@angular/core";
import { RnboParametersService } from "../rnbo-parameters.service";
import { BehaviorSubject } from "rxjs";
import { INgxParameter } from "../../../types/parameter";

export function bindToSignal(this: RnboParametersService, id: string, signal: WritableSignal<number>) { 
    const param = (this.byId(id)?.sig()??null) as INgxParameter|null;
    if(!param) return;
    const paramToSignal = param.changeEvent.subscribe((v: number) => signal.set(v));
    const signalToParam = effect(() => param.value = signal(), {injector: this.injector});
    this.parameterSignalSubscriptions.set(id, paramToSignal);
    this.signalParameterSubscriptions.set(id, signalToParam);
}



export function bindToSubject(this: RnboParametersService, id: string, subject: BehaviorSubject<number>) { 
    const param = (this.byId(id)?.sig()??null) as INgxParameter|null;
    if(!param) return;
    
    const paramToSubject = param.changeEvent
        .subscribe((value: number) => {   
            console.log(`setting subject to ${value}`);
            subject.next(value);
    });

    const subjectToParam = subject
        .subscribe((value: number) =>  {   
            const param = this.byId(id)?.sig() as INgxParameter;
            param?.formControl?.setValue(value);
    });

    this.parameterSubjectSubscriptions.set(id, paramToSubject);
    this.subjectParameterSubscriptions.set(id, subjectToParam);
}