import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'snakeCase'
})
export class SnakeCasePipe implements PipeTransform {

  transform(value: string): string {
    console.log(value);
    console.log(value.replace('_',' '));
    return value.replace('_',' ');
  }

}
