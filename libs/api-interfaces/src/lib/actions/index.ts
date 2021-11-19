import { Game } from 'libs/api-interfaces/src/lib/models/game';
import { GameAction } from 'libs/api-interfaces/src/lib/models/action';

export const startGameAction = 'start-game-action';
export const equipItemAction = 'equipItemAction';
export const unequipItemAction = 'unequipItemAction';
export const moveCardAction = 'moveCardAction';
export const startStagingAction = 'startStagingAction';
export const selectFirstPlayer = 'selectFirstPlayer';
export const diceThrowAction = 'diceThrowAction';
export const doorBreakAction = 'doorBreakAction';
export const dialDoorAction = 'dialDoorAction';

export const actionEventName = 'action';
export const createGameEventName = 'create';
export const resetTestGameStateEventName = 'resetTestGameState';
export const joinGameEventName = 'joinGame'

export interface DialCardPayload {
  readonly playerId: string;
}

export const gameUpdate = 'gameUpdate';

export interface GameUpdateMessage {
  readonly game: Game;
}

export interface ActionMessage {
  readonly gameId: string;
  readonly action: GameAction;
}

export interface JoinGameMessage {
  readonly gameId: string;
}

export const dialTreasureAction = 'dialTreasureAction';

export interface GameChange {
  readonly gameId: string;
  readonly difference: Game[];
}
