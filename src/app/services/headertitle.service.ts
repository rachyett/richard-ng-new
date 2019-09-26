import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HeaderService {
  public title = new BehaviorSubject('Under Construction');
  public dropdown = new BehaviorSubject('Select');

  constructor() { }

  setTheTitle(title) {
    this.title.next(title);
  }

  setDropdown(dropdown) {
    this.dropdown.next(dropdown);
  }
}
