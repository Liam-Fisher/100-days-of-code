import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RnboCliService {

  constructor() { }
  executeCommand(command: string): Observable<string> {
    return new Observable<string>(observer => {
      observer.next('Command executed');
      observer.complete();
    });
  }
}
