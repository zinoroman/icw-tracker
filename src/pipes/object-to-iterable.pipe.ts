import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'objectToIterable'
})
export class ObjectToIterablePipe implements PipeTransform {
    transform(value, args: string[]): any {
        const iterable = [];

        for (let key in value) {
            iterable.push({
                key: key,
                value: value[key]
            });
        }

        return iterable;
    }
}