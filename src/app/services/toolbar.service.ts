import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';


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

}
