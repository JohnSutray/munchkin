import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { myDeckId } from 'apps/munchkin/src/app/constants/workspace.constants';
import { allItemTypes } from 'libs/api-interfaces/src/lib/cards/cards-collection';

@Injectable()
export class DndLinksService {
  private readonly _linkedDndPoints$ = new BehaviorSubject<string[]>([
    myDeckId,
    ...allItemTypes,
  ]);

  readonly linkedDndPoints$ = this._linkedDndPoints$.asObservable()
}
