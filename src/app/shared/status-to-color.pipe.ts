import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusToColor'
})
export class StatusToColorPipe implements PipeTransform {

  transform(value: string): number {
    if (value === 'dropped' || value === 'chuté') { return 3; }
    else if (value === 'completed' || value === 'terminé') { return 8; }
    else if (value === 'in progress' || value === 'on hold' || value === 'en attente') { return 1; }
    else return;
  }
}