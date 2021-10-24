import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { equipmentId } from 'apps/munchkin/src/app/constants/workspace.constants';

@Injectable()
export class DndLinksService {
  static readonly myDeckPoint = 'myDeckPoint';
  // static readonly myDeckPoint = 'myDeckPoint';

  private readonly _linkedDndPoints = new BehaviorSubject<string[]>([
    equipmentId,
  ]);

  get linkedDndPoints(): Observable<string[]> {
    return this._linkedDndPoints.asObservable();
  }
}
