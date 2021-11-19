import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DndLinksService } from 'apps/munchkin/src/app/services/dnd-links.service';
import { CardMoveOverlayService } from 'apps/munchkin/src/app/services/card-move-overlay.service';
import { CardPlaceholderService } from 'apps/munchkin/src/app/services/card-placeholder.service';
import { MyDeckService } from 'apps/munchkin/src/app/services/my-deck.service';
import { GameIterationService } from 'apps/munchkin/src/app/services/game-iteration.service';
import { PlayerDataService } from 'apps/munchkin/src/app/services/player-data.service';
import { EquipmentService } from 'apps/munchkin/src/app/services/equipment.service';
import { ActionService } from 'apps/munchkin/src/app/services/action.service';

@Component({
  selector: 'munchkin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    DndLinksService,
    CardMoveOverlayService,
    CardPlaceholderService,
    MyDeckService,
    GameIterationService,
    PlayerDataService,
    EquipmentService,
    ActionService,
  ],
})
export class AppComponent implements OnInit {
  readonly game$ = this.gameIterationService.game$;

  constructor(
    private readonly gameIterationService: GameIterationService,
    private readonly playerDataService: PlayerDataService,
    private readonly actionService: ActionService,
  ) {
  }

  ngOnInit(): void {
    this.playerDataService.setPlayerId('1');
    this.actionService.notConnected$.subscribe(console.error);
    this.actionService.connected$.subscribe(this.initializeClient);
  }

  private initializeClient = () => {
    this.actionService.joinGame();
    this.actionService.resetGame();
    this.gameIterationService.subscribeToUpdates();
    this.actionService.startGame();
  }
}
