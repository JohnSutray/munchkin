import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class SubscribingComponent {
  private readonly _destroy$ = new Subject<void>();

  protected readonly takeUntilDestroy = takeUntil<any>(this._destroy$);

  ['ngOnDestroy'](): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
