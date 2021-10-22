import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { Game } from 'libs/api-interfaces/src/lib/models/game';
import { GameChange, gameUpdate } from 'libs/api-interfaces/src/lib/actions';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';

let index = 1;

@Injectable()
export class GameIterationService {
  private updatesProcessing: boolean = false;
  private currentTasks: Observable<any>[] = [];
  private readonly allUpdates: Game[] = [];
  private readonly _currentUpdate$ = new BehaviorSubject<Game>(null);

  readonly currentUpdate$ = this._currentUpdate$.asObservable().pipe(filter<Game>(Boolean));

  get game(): Game {
    return this._currentUpdate$.value;
  }

  constructor(
    private readonly socket: Socket,
  ) {
  }

  updatesOfType$(type: string): Observable<Game> {
    return this.currentUpdate$.pipe(
      filter(update => update.currentAction.name === type),
    );
  }

  registerTask = (duration: Observable<any>) => this.currentTasks.push(duration);

  subscribeToUpdates(): void {
    this.socket.fromEvent<GameChange>(gameUpdate)
      .pipe(map(update => update.difference))
      .subscribe(this.setSnapshots);
    this.currentUpdate$.pipe(
      delay(1),
      switchMap(this.awaitAllUpdates),
    ).subscribe(this.processUpdate);
  }

  private setSnapshots = (updates: Game[]): void => {
    this.allUpdates.push(...updates);
    if (false) {
      const label = `Update pack ${index++}`;
      console.group(label);
      updates.forEach(u => console.log(u));
      console.groupEnd();
    }

    if (!this.updatesProcessing) {
      this.processUpdate();
    }
  };

  private resetTasks(): void {
    this.currentTasks = [];
  }

  private awaitAllUpdates = () => {
    return this.currentTasks.length
      ? zip(...this.currentTasks)
      : of({});
  };

  private processUpdate = (): void => {
    if (this.allUpdates.length) {
      this.updatesProcessing = true;
      this.resetTasks();
      this._currentUpdate$.next(this.allUpdates.shift());
    } else {
      this.updatesProcessing = false;
    }
  };
}
