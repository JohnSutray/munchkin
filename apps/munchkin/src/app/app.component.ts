import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  actionEventName,
  ActionMessage,
  joinGameEventName,
  JoinGameMessage,
  resetTestGameStateEventName,
  startGameAction,
} from 'libs/api-interfaces/src/lib/actions';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { Socket } from 'ngx-socket-io';
import { DndLinksService } from 'apps/munchkin/src/app/services/dnd-links.service';
import { CardMoveOverlayService } from 'apps/munchkin/src/app/services/card-move-overlay.service';
import { CardPlaceholderService } from 'apps/munchkin/src/app/services/card-placeholder.service';
import { MyDeckService } from 'apps/munchkin/src/app/services/my-deck.service';
import { GameIterationService } from 'apps/munchkin/src/app/services/game-iteration.service';
import { PlayerDataService } from 'apps/munchkin/src/app/services/player-data.service';

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
  ],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly socket: Socket,
    private readonly cardMoveOverlayService: CardMoveOverlayService,
    private readonly cardPlaceholderService: CardPlaceholderService,
    private readonly myDeckService: MyDeckService,
    private readonly gameIterationService: GameIterationService,
    private readonly playerDataService: PlayerDataService,
  ) {
  }

  private get joinGameMessage(): JoinGameMessage {
    return { gameId: '1' };
  }

  ngOnInit(): void {
    this.playerDataService.setPlayerId('1');
    this.socket.fromEvent('connect_error').subscribe(console.error);
    this.socket.fromEvent('connect').subscribe(this.initializeClient);
  }

  resetGameState(): void {
    this.socket.emit(resetTestGameStateEventName);
  }

  private initializeClient = () => {
    this.socket.emit(joinGameEventName, this.joinGameMessage);
    this.socket.emit(resetTestGameStateEventName)
    this.gameIterationService.subscribeToUpdates();
    this.socket.emit(actionEventName, {
      gameId: '1',
      action: createAction(startGameAction),
    } as ActionMessage);
  }
}
