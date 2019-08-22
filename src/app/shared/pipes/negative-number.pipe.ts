import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negNumber'
})
export class NegativeNumberPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return typeof value === 'number' && value < 0 ? `(${Math.abs(value)})` : value;
  }

}
