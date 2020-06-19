import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusToColor'
})
export class StatusToColorPipe implements PipeTransform {

  transform(value: string): number {
    if(value === 'dropped') return 3;
    else if (value === 'completed') return 8;
    else if (value === 'in progress' || value === 'on hold') return 1;
  }

}
