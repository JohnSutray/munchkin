import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DndLinksService {
  static readonly myDeckPoint = 'myDeckPoint';
  // static readonly myDeckPoint = 'myDeckPoint';

  private readonly _linkedDndPoints = new BehaviorSubject<string[]>([]);

  get linkedDndPoints(): Observable<string[]> {
    return this._linkedDndPoints.asObservable();
  }
}
