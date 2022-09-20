import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'substr'
})

export class SubstrPipe implements PipeTransform {

  transform(value: any, startFrom: number, endTo: number) {
    if (value.length > endTo) {
      return value.substr(startFrom, endTo) + ' ...';
    } else {
      return value;
    }
  }

}
