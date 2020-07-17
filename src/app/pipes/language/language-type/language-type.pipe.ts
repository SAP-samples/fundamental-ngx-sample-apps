import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageType'
})
export class LanguageTypePipe implements PipeTransform {


  constructor() {}

  transform(value: string, language: 'en'|'fr') {

    if (language === 'en') {
      return value;
    } else {
      switch (value.toLocaleLowerCase()) {
        case ('premium'): return 'Prime';
        case ('gold'): return 'Or';
        case ('silver'): return 'Argent';
      }
    }
  }

}
