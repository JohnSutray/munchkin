export const startGameAction = 'start-game-action';
export const equipItemAction = 'equipItemAction';
export const startStagingAction = 'startStagingAction';
export const selectFirstPlayer = 'selectFirstPlayer';
export const diceThrowAction = 'diceThrowAction';
export const doorBreakAction = 'doorBreakAction';
export const dialDoorAction = 'dialDoorAction';

export interface DialDoorPayload {
  readonly playerId: string;
}
