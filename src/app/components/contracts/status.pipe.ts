import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {

    transform(value: string): string {
        switch (value) {
            case 'completed': return '8';
            case 'on hold': return '1';
            case 'dropped': return '3';
            case 'ready': return '10';
            case 'in progress': return '6';
        }
    }

}
