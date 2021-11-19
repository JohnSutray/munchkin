import { Injectable } from '@angular/core';
import { GameIterationService } from 'apps/munchkin/src/app/services/game-iteration.service';
import { PlayerDataService } from 'apps/munchkin/src/app/services/player-data.service';
import { isBody, isBoots, isHand, isHead } from 'libs/api-interfaces/src/lib/cards/cards-collection';
import { map, switchMapTo } from 'rxjs/operators';
import { BehaviorSubject, MonoTypeOperatorFunction } from 'rxjs';
import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { without } from 'lodash-es';

@Injectable()
export class EquipmentService {
  private readonly _items$ = new BehaviorSubject<string[]>([]);

  constructor(
    private readonly gameIterationService: GameIterationService,
    private readonly playerDataService: PlayerDataService,
  ) {
  }

  readonly items$ = this._items$.asObservable();

  readonly headId$ = this.items$.pipe(
    map(items => items.find(isHead)),
  );

  readonly bodyId$ = this.items$.pipe(
    map(items => items.find(isBody)),
  );

  readonly bootsId$ = this.items$.pipe(
    map(items => items.find(isBoots)),
  );

  readonly leftHandId$ = this.items$.pipe(
    map(items => items.find(isHand)),
  );

  startItemsObserve(takeUntil: MonoTypeOperatorFunction<Player>): void {
    this.playerDataService.player$.pipe(
      takeUntil,
      map(({ items }) => items),
    ).subscribe(this._items$);
  }

  removeItemLocally(itemId: string): void {
    this._items$.next(without(this._items$.value, itemId));
  }

  private findRightHand = (leftHand: string) => this.playerDataService.player.items
    .find(item => isHand(item) && item !== leftHand);

  readonly rightHandId$ = this.items$.pipe(
    switchMapTo(this.leftHandId$),
    map(this.findRightHand),
  );
}
