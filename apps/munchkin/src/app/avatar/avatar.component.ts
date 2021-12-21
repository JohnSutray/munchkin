import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../../../../../libs/api-interfaces/src/lib/models/player';
import { switchMap } from 'rxjs/operators';
import { GameIterationService } from '../services/game-iteration.service';
import { PlayerDataService } from '../services/player-data.service';

@Component({
  selector: 'munchkin-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent implements OnInit {
  @Input() playerId$: Observable<string>;

  get player$(): Observable<Player> {
    return this.playerId$.pipe(
      switchMap(id => this.playerDataService.playerWithId$(id)),
    );
  }

  constructor(
    private readonly gameIterationService: GameIterationService,
    private readonly playerDataService: PlayerDataService,
  ) {
  }

  ngOnInit(): void {
  }

}
