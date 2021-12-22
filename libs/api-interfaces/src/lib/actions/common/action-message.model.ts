import { GameAction } from 'libs/api-interfaces/src/lib/models/action';

export interface ActionMessage {
  readonly gameId: string;
  readonly action: GameAction;
}
