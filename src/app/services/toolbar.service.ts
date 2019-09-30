import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
/* source https://medium.com/@snero90/angular-material-navbar-with-toolbar-show-hide-option-400ec3294a7a   */

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  visible: Observable<boolean>;

  constructor() {

  }

hide() {
  this.visible = Observable.of(false);
}

show() {
  this.visible = Observable.of(true);
}

tiggle() {
  this.visible = Observable.of(!this.visible);
}
}
