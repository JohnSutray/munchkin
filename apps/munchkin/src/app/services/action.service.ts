import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PlayerDataService } from 'apps/munchkin/src/app/services/player-data.service';
import {
  actionEventName,
  ActionMessage, approveStagingReadyStateAction, breakDoorAction,
  equipItemAction,
  joinGameEventName, JoinGameMessage, moveCardAction, resetTestGameStateEventName, setPlayerReadyStateAction,
  startGameAction, unequipItemAction,
} from 'libs/api-interfaces/src/lib/actions';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { GameIterationService } from 'apps/munchkin/src/app/services/game-iteration.service';
import { MoveCardPayload } from 'libs/api-interfaces/src/lib/actions/payloads/move-card.payload';
import { EquipItemPayload } from 'libs/api-interfaces/src/lib/actions/payloads/equip-item.payload';
import { SetPlayerReadyStatePayload } from 'libs/api-interfaces/src/lib/actions/payloads/set-player-ready-state.payload';
import { UnequipItemPayload } from 'libs/api-interfaces/src/lib/actions/payloads/unequip-item.payload';

@Injectable()
export class ActionService {
  readonly connected$ = this.socket.fromEvent('connect');
  readonly notConnected$ = this.socket.fromEvent('connect_error');

  constructor(
    private readonly socket: Socket,
    private readonly playerDataService: PlayerDataService,
    private readonly gameIterationService: GameIterationService,
  ) {
  }

  private get playerId(): string {
    return this.playerDataService.player.id;
  }

  joinGame(): void {
    const message: JoinGameMessage = { gameId: '1' };

    this.socket.emit(joinGameEventName, message);
  }

  startGame(): void {
    const message: ActionMessage = {
      gameId: '1',
      action: createAction(startGameAction),
    };

    this.socket.emit(actionEventName, message);
  }

  resetGame(): void {
    this.socket.emit(resetTestGameStateEventName);
  }

  equipCard(cardId: string): void {
    this.sendAction<EquipItemPayload>(equipItemAction, {
      itemId: cardId,
      playerId: this.playerId,
    });
  }

  moveCard(cardId: string, newIndex: number): void {
    this.sendAction<MoveCardPayload>(moveCardAction, {
      newIndex,
      itemId: cardId,
      playerId: this.playerId
    });
  }

  unequipCard(cardId: string, newIndexInDeck: number): void {
    this.sendAction<UnequipItemPayload>(unequipItemAction, {
      newIndexInDeck,
      itemId: cardId,
      playerId: this.playerId,
    });
  }

  breakDoor(): void {
    this.sendAction(breakDoorAction);
  }

  approveStagingReadyState(): void {
    this.sendAction<SetPlayerReadyStatePayload>(approveStagingReadyStateAction, {
      playerId: this.playerDataService.player.id,
    });
  }

  private sendAction<T = any>(name: string, payload?: T): void {
    const actionMessage: ActionMessage = {
      gameId: this.gameIterationService.game.id,
      action: createAction(name, payload),
    };

    this.socket.emit(actionEventName, actionMessage);
  }
}
