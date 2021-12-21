import { Game } from 'libs/api-interfaces/src/lib/models/game';
import { GameAction } from 'libs/api-interfaces/src/lib/models/action';

export const actionEventName = 'action';
export const resetTestGameStateEventName = 'resetTestGameState';
export const joinGameEventName = 'joinGame'
export const gameUpdate = 'gameUpdate';

export const startGameAction = 'startGameAction';
export const equipItemAction = 'equipItemAction';
export const unequipItemAction = 'unequipItemAction';
export const moveCardAction = 'moveCardAction';
export const checkSingleDiceWinnerAction = 'checkSingleDiceWinnerAction';
export const startStagingAction = 'startStagingAction';
export const setStagingGameStateAction = 'setStagingGameStateAction';
export const selectFirstPlayer = 'selectFirstPlayer';
export const diceThrowAction = 'diceThrowAction';
export const doorBreakPromtAction = 'doorBreakPromtAction';
export const setBrokenDoorAction = 'setBrokenDoorAction';
export const breakDoorAction = 'breakDoorAction';
export const dialDoorAction = 'dialDoorAction';
export const dialTreasureAction = 'dialTreasureAction';
export const startBattleAction = 'startBattleAction';
export const checkBrokenDoorAction = 'checkBrokenDoorAction';
export const setPlayerReadyStateAction = 'setPlayerReadyStateAction';
export const approveStagingReadyStateAction = 'approveStagingReadyStateAction';
export const checkAllHaveStagingReadyStateAction = 'checkAllHaveStagingReadyStateAction';
export const setBattleApproveStateAction = 'setBattleApproveStateAction'
export const battleApproveAction = 'setBattleApproveStateAction'

export interface ActionMessage {
  readonly gameId: string;
  readonly action: GameAction;
}
export interface JoinGameMessage {
  readonly gameId: string;
}
export interface GameChange {
  readonly gameId: string;
  readonly difference: Game[];
}
