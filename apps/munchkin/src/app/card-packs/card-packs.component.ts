import { Component } from '@angular/core';
import {
  brokenDoor,
  doorsDropId,
  doorsId,
  treasuresDropId,
  treasuresId,
} from 'apps/munchkin/src/app/constants/workspace.constants';
import { flamingArmorTreasureId, placeholderDoorId } from 'libs/api-interfaces/src/lib/cards/cards-collection';
import { mapTo } from 'rxjs/operators';
import { GameIterationService } from 'apps/munchkin/src/app/services/game-iteration.service';
import { GameActions } from 'libs/api-interfaces/src/lib/actions';

@Component({
  selector: 'munchkin-card-packs',
  templateUrl: './card-packs.component.html',
  styleUrls: ['./card-packs.component.scss'],
})
export class CardPacksComponent {
  readonly doorsConnectedTo$ = this.gameIterationService
    .updatesOfType$(GameActions.doorBreakPromtAction)
    .pipe(mapTo([brokenDoor]));

  readonly doorPlaceholder = placeholderDoorId;
  readonly treasurePlaceholder = flamingArmorTreasureId;

  readonly doors = doorsId;
  readonly doorsDrop = doorsDropId;
  readonly treasures = treasuresId;
  readonly treasuresDrop = treasuresDropId;

  constructor(
    private readonly gameIterationService: GameIterationService,
  ) {
  }
}
