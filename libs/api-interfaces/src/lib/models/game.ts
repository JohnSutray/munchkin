import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { GameAction } from 'libs/api-interfaces/src/lib/models/action';

export interface Game {
  readonly id: string;
  readonly doors: string[];
  readonly doorsDrop: string[];
  readonly treasures: string[];
  readonly treasuresDrop: string[];
  readonly players: Player[];
  readonly currentAction: GameAction;
  readonly completedActions: GameAction[];
  readonly firstPlayer: string;
}
