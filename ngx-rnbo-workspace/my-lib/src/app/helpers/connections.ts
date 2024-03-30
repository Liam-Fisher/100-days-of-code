import { Event, EventSubject, IEventListener, MIDIEvent, MessageEvent, PresetEvent, TempoEvent, TimeSignatureEvent, TransportEvent } from "@rnbo/js";
import { BehaviorSubject, Observable, OperatorFunction, fromEventPattern, map, pipe } from "rxjs";
import { NgxDevice } from "../types/device";




export function connectBSubjects<T extends any>(bsubject1: BehaviorSubject<T>, bsubject2: BehaviorSubject<T>) {
        return bsubject1.subscribe((msg) => bsubject2.next(msg));
}

export function connectRNBOToBehaviorSubject<TOut extends Event|void, TIn extends number[]>
(esubject: EventSubject<TOut>, bsubject: BehaviorSubject<TIn>, map: (msg: TOut) => TIn) {
    const sub = esubject.subscribe((evt) => bsubject.next(map(evt)));
    bsubject.complete = () => sub.unsubscribe();
    return bsubject;
}

export function connectBehaviourSubjectToRNBO<TIn extends (string|number)[], TOut extends Event>
(device: NgxDevice, subject: BehaviorSubject<TIn>, map: (msg: TIn) => TOut) {
    return subject.subscribe((msg) => device.scheduleEvent(map(msg)));
}
    
