import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CardMovingTask } from 'apps/munchkin/src/app/models/card-moving-task.model';

@Injectable()
export class CardMoveOverlayService {
  private readonly _task$ = new Subject<CardMovingTask>();
  private readonly _taskCompleted$ = new Subject();

  get task$(): Observable<CardMovingTask> {
    return this._task$.asObservable();
  }


  startCardMoving(task: CardMovingTask): void {
    this._task$.next(task);
  }
}
