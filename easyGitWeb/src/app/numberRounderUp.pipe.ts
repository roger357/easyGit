import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberRounderUP'
})
export class NumberRounderUpPipe implements PipeTransform {

    /**
     *
     * @param value
     * @returns {number}
     */
    transform(value: number): number {
        return Math.ceil(value);
    }

}
