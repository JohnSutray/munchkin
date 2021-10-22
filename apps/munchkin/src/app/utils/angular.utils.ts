import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export const afterNextViewInit = <TData>(data: TData) => of(data).pipe(delay(1));
