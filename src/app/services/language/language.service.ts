import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _lang = new BehaviorSubject<'en'|'fr'>('en');

  constructor() { }

  get lang () {
    return this._lang;
  }

  updateLang(lang: 'en'|'fr') {
    this._lang.next(lang);
  }
  
}
