import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toRomanNumeral'
})
export class ToRomanNumeralPipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {
    switch (value) {
      case '1':
        return 'I';
      case '2':
        return 'II';
      case '3':
        return 'III';
      case '4':
        return 'IV';
      default:
        return '';
    }
  }

}
