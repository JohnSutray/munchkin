import { GameAction } from "../action";

export interface ActionMessage {
  readonly gameId: string;
  readonly action: GameAction;
}
