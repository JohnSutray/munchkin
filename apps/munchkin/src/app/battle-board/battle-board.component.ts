import { Component } from '@angular/core';
import { brokenDoor } from 'apps/munchkin/src/app/constants/workspace.constants';
import { GameIterationService } from 'apps/munchkin/src/app/services/game-iteration.service';
import { ActionService } from 'apps/munchkin/src/app/services/action.service';
import { setBrokenDoorAction, startBattleAction } from 'libs/api-interfaces/src/lib/actions';
import { map, mapTo } from 'rxjs/operators';
import { merge, Subject } from 'rxjs';
import { placeholderDoorId } from 'libs/api-interfaces/src/lib/cards/cards-collection';
import { Game } from 'libs/api-interfaces/src/lib/models/game';
import {
  getMonsterSideTotalDamage,
  getPlayerSideTotalDamage,
} from '../../../../../libs/api-interfaces/src/lib/utils/game.utils';

@Component({
  selector: 'munchkin-battle-board',
  templateUrl: './battle-board.component.html',
  styleUrls: ['./battle-board.component.scss'],
})
export class BattleBoardComponent {
  readonly brokenDoorId = brokenDoor;
  readonly brokenDoorPlaceholderId$ = new Subject<string>();

  readonly brokenDoorId$ = merge(
    this.brokenDoorPlaceholderId$,
    this.gameIterationService.updatesOfType$(setBrokenDoorAction).pipe(map(this.getCurrentBrokenDoor)),
  );

  readonly inBattleState$ = merge(
    this.gameIterationService.updatesOfType$(startBattleAction).pipe(mapTo(true)),
    // TODO: create end of battle event
    // this.gameIterationService.updatesOfType$()
  );

  readonly battleInitiator$ = this.gameIterationService.game$.pipe(map(game => game.currentPlayer));

  // TODO: fix blink of shirt
  readonly showShirtIfPlaceholder$ = this.brokenDoorId$.pipe(
    map(cardId => cardId === placeholderDoorId),
  );

  constructor(
    private readonly gameIterationService: GameIterationService,
    private readonly actionService: ActionService,
  ) {
  }

  brokeDoor(): void {
    this.brokenDoorPlaceholderId$.next(placeholderDoorId);
    this.actionService.breakDoor();
  }

  private getCurrentBrokenDoor({ currentBrokenDoor }: Game): string {
    return currentBrokenDoor;
  }
}
