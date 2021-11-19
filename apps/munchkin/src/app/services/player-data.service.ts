import { Injectable } from '@angular/core';
import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { GameIterationService } from 'apps/munchkin/src/app/services/game-iteration.service';
import { map } from 'rxjs/operators';
import { find } from 'lodash-es';

@Injectable()
export class PlayerDataService {
  private _playerId: string;

  constructor(
    private readonly gameIterationService: GameIterationService,
  ) {
  }

  readonly player$ = this.gameIterationService.game$.pipe(
    map(() => this.player),
  );

  get player(): Player {
    return find(this.gameIterationService.game.players, { id: this._playerId });
  }

  setPlayerId(id: string): void {
    this._playerId = id;
  }
}
