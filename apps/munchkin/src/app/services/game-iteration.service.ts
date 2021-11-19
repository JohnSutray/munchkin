import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { Game } from 'libs/api-interfaces/src/lib/models/game';
import { GameChange, gameUpdate } from 'libs/api-interfaces/src/lib/actions';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';

let index = 1;

@Injectable()
export class GameIterationService {
  private snapshotsProcessing: boolean = false;
  private currentTasks: Observable<any>[] = [];
  private readonly gameSnapshots: Game[] = [];
  private readonly _game$ = new BehaviorSubject<Game>(null);

  readonly game$ = this._game$.asObservable().pipe(filter<Game>(Boolean));

  get game(): Game {
    return this._game$.value;
  }

  constructor(
    private readonly socket: Socket,
  ) {
  }

  updatesOfType$(type: string): Observable<Game> {
    return this.game$.pipe(
      filter(update => update.currentAction.name === type),
    );
  }

  registerTask = (duration: Observable<any>) => this.currentTasks.push(duration);

  subscribeToUpdates(): void {
    this.socket.fromEvent<GameChange>(gameUpdate)
      .pipe(map(update => update.difference))
      .subscribe(this.setSnapshots);
    this.game$.pipe(
      delay(1),
      switchMap(this.awaitAllUpdates),
    ).subscribe(this.processUpdate);
  }

  private setSnapshots = (updates: Game[]): void => {
    this.gameSnapshots.push(...updates);
    if (true) {
      const label = `Update pack ${index++}`;
      console.groupCollapsed(label);
      updates.forEach(u => console.log(u));
      console.groupEnd();
    }

    if (!this.snapshotsProcessing) {
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
    if (this.gameSnapshots.length) {
      this.snapshotsProcessing = true;
      this.resetTasks();
      this._game$.next(this.gameSnapshots.shift());
    } else {
      this.snapshotsProcessing = false;
    }
  };
}
