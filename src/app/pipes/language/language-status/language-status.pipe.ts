import { Pipe, PipeTransform } from '@angular/core';
import {LanguageService} from '../../../services/language/language.service';

@Pipe({
  name: 'languageStatus'
})
export class LanguageStatusPipe implements PipeTransform {

constructor() {}

  transform(value: string, language) {
    if (language === 'en') {
      return value;
    } else {
      switch (value.toLocaleLowerCase()) {
        case ('completed'): return 'terminé';
        case ('on hold'): return 'en attente';
        case ('in progress'): return 'en progrès';
        case ('dropped'): return 'chuté';
      }
      }
  }
}
