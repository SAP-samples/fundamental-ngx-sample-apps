import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LuigiUiService {

  private _luigiOption = new BehaviorSubject<any>(false);

  constructor() { }

  updateLuigiUi(show:boolean) {
    console.log('show');
    console.log(show);
    this._luigiOption.next(show);
  }

  get luigiOption() {
    return this._luigiOption;
  }
}
