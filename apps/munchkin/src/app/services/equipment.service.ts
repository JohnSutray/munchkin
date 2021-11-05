import { Injectable } from '@angular/core';
import { GameIterationService } from 'apps/munchkin/src/app/services/game-iteration.service';
import { PlayerDataService } from 'apps/munchkin/src/app/services/player-data.service';
import { isBody, isBoots, isHand, isHead } from 'libs/api-interfaces/src/lib/cards/cards-collection';
import { map, switchMap, switchMapTo } from 'rxjs/operators';

@Injectable()
export class EquipmentService {
  constructor(
    private readonly gameIterationService: GameIterationService,
    private readonly playerDataService: PlayerDataService,
  ) {
  }

  readonly items$ = this.playerDataService.player$.pipe(
    map(player => player.items),
  );

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

  private findRightHand = (leftHand: string) => this.playerDataService.player.items
    .find(item => isHand(item) && item !== leftHand);

  readonly rightHandId$ = this.items$.pipe(
    switchMapTo(this.leftHandId$),
    map(this.findRightHand),
  );
}
