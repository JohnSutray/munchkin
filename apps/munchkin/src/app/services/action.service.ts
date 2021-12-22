import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { PlayerDataService } from 'apps/munchkin/src/app/services/player-data.service';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { GameIterationService } from 'apps/munchkin/src/app/services/game-iteration.service';
import { MoveCardPayload } from 'libs/api-interfaces/src/lib/actions/payloads/move-card.payload';
import { EquipItemPayload } from 'libs/api-interfaces/src/lib/actions/payloads/equip-item.payload';
import {
  SetPlayerReadyStatePayload,
} from 'libs/api-interfaces/src/lib/actions/payloads/set-player-ready-state.payload';
import { UnequipItemPayload } from 'libs/api-interfaces/src/lib/actions/payloads/unequip-item.payload';
import { ActionMessage } from 'libs/api-interfaces/src/lib/actions/common/action-message.model';
import { JoinGameMessage } from 'libs/api-interfaces/src/lib/actions/common/join-game-message.model';
import {
  actionEventName,
  joinGameEventName,
  resetTestGameStateEventName,
} from 'libs/api-interfaces/src/lib/actions/common/common-events';
import { GameActions } from 'libs/api-interfaces/src/lib/actions';

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
      action: createAction(GameActions.startGameAction),
    };

    this.socket.emit(actionEventName, message);
  }

  resetGame(): void {
    this.socket.emit(resetTestGameStateEventName);
  }

  equipCard(cardId: string): void {
    this.sendAction<EquipItemPayload>(GameActions.equipItemAction, {
      itemId: cardId,
      playerId: this.playerId,
    });
  }

  moveCard(cardId: string, newIndex: number): void {
    this.sendAction<MoveCardPayload>(GameActions.moveCardAction, {
      newIndex,
      itemId: cardId,
      playerId: this.playerId
    });
  }

  unequipCard(cardId: string, newIndexInDeck: number): void {
    this.sendAction<UnequipItemPayload>(GameActions.unequipItemAction, {
      newIndexInDeck,
      itemId: cardId,
      playerId: this.playerId,
    });
  }

  breakDoor(): void {
    this.sendAction(GameActions.breakDoorAction);
  }

  approveStagingReadyState(): void {
    this.sendAction<SetPlayerReadyStatePayload>(GameActions.approveStagingReadyStateAction, {
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
