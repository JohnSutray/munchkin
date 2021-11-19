import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PlayerDataService } from 'apps/munchkin/src/app/services/player-data.service';
import {
  actionEventName,
  ActionMessage,
  equipItemAction,
  joinGameEventName, JoinGameMessage, moveCardAction, resetTestGameStateEventName,
  startGameAction, unequipItemAction,
} from 'libs/api-interfaces/src/lib/actions';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { EquipItemPayload } from 'apps/api/src/app/actions/equip-item.action';
import { GameIterationService } from 'apps/munchkin/src/app/services/game-iteration.service';
import { UnequipItemPayload } from 'apps/api/src/app/actions/unequip-item.action';
import { MoveCardPayload } from 'apps/api/src/app/actions/move-card.action';

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
    const payload: EquipItemPayload = {
      itemId: cardId,
      playerId: this.playerId,
    };
    this.sendAction(equipItemAction, payload);
  }

  moveCard(cardId: string, newIndex: number): void {
    const payload: MoveCardPayload = {
      newIndex,
      itemId: cardId,
      playerId: this.playerId
    };
    this.sendAction(moveCardAction, payload);
  }

  unequipCard(cardId: string, newIndexInDeck: number): void {
    const payload: UnequipItemPayload = {
      newIndexInDeck,
      itemId: cardId,
      playerId: this.playerId
    };
    this.sendAction(unequipItemAction, payload);
  }

  private sendAction(name: string, payload?: any): void {
    const actionMessage: ActionMessage = {
      gameId: this.gameIterationService.game.id,
      action: createAction(name, payload),
    };

    this.socket.emit(actionEventName, actionMessage);
  }
}
