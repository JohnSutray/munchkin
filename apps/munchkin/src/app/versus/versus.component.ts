import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  getMonsterSideTotalDamage,
  getPlayerSideTotalDamage,
} from '../../../../../libs/api-interfaces/src/lib/utils/game.utils';
import { GameIterationService } from '../services/game-iteration.service';

@Component({
  selector: 'munchkin-versus',
  templateUrl: './versus.component.html',
  styleUrls: ['./versus.component.scss'],
})
export class VersusComponent {
  readonly totalMonsterPower$ = this.gameIterationService.game$.pipe(map(getMonsterSideTotalDamage));
  readonly totalPlayersPower$ = this.gameIterationService.game$.pipe(map(getPlayerSideTotalDamage));

  constructor(
    private readonly gameIterationService: GameIterationService,
  ) {
  }
}
