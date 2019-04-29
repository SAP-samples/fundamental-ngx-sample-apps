import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {

    transform(value: string): string {
        switch (value) {
            case 'completed': return 'success';
            case 'on hold': return 'warning';
            case 'dropped': return 'error';
            case 'ready': return 'success';
            case 'in progress': return 'warning';
        }
    }

}
