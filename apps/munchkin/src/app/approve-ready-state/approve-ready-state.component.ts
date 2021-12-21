import { Component, OnInit } from '@angular/core';
import { Game } from '../../../../../libs/api-interfaces/src/lib/models/game';
import { map } from 'rxjs/operators';
import { ActionService } from '../services/action.service';
import { GameIterationService } from '../services/game-iteration.service';
import { PlayerDataService } from '../services/player-data.service';

@Component({
  selector: 'munchkin-approve-ready-state',
  templateUrl: './approve-ready-state.component.html',
  styleUrls: ['./approve-ready-state.component.scss'],
})
export class ApproveReadyStateComponent {
  readonly canSetReadyState$ = this.gameIterationService.game$.pipe(
    map(this.canSetReadyState.bind(this).bind(this)),
  );

  constructor(
    private readonly actionService: ActionService,
    private readonly gameIterationService: GameIterationService,
    private readonly playerDataService: PlayerDataService,
  ) {
  }

  approveStagingReadyState(): void {
    this.actionService.approveStagingReadyState();
  }

  private canSetReadyState(
    { stagingReadyPlayers, staging }: Game,
  ) {
    return staging && !stagingReadyPlayers.includes(this.playerDataService.player.id);
  }
}
