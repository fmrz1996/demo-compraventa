import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleProduct'
})
export class TitleProductPipe implements PipeTransform {
  transform(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
