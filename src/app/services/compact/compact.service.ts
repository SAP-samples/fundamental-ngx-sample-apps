import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompactService {

  private _compact = new BehaviorSubject<boolean>(false);

  constructor() { }

  get compact () {
    return this._compact;
  }

  updateCompact(bool:boolean) {
    this._compact.next(bool);
  }
}
