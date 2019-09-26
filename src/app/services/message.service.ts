import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// https://jasonwatmore.com/post/2018/06/25/angular-6-communicating-between-components-with-observable-subject

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  private subject = new Subject<any>();


  add(message: string) {
    this.messages.push(message);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
}

  clear() {
    this.messages = [];
    this.subject.next();
  }
  constructor() { }
}
