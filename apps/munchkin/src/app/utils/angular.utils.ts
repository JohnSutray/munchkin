import { of } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';

export const afterNextViewInit = <TData>(data: TData) => of(data).pipe(delay(1));

export const filterNotNull = <T>() => filter<T>(Boolean);

export const logTap = <T>(name: string) => tap<T>(value => console.log(
  `${name}: \n`,
  value,
  '---------------------------------'
));
