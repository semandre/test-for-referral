import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negNumber'
})
export class NegativeNumberPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (typeof value === 'number') {
      return value < 0 ? `(${Math.abs(value).toLocaleString()})` : value.toLocaleString();
    } else {
      return value;
    }
  }
}
