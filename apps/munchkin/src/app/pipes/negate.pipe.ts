import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negate',
  pure: true,
})
export class NegatePipe implements PipeTransform {
  transform(value: unknown): boolean {
    return !value;
  }

}
