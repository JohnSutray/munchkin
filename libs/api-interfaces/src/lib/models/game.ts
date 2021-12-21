import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { GameAction } from 'libs/api-interfaces/src/lib/models/action';

export interface Game<TActionPayload = any> {
  readonly id: string;
  readonly doors: string[];
  readonly doorsDrop: string[];
  readonly treasures: string[];
  readonly treasuresDrop: string[];
  readonly players: Player[];
  readonly currentAction: GameAction<TActionPayload>;
  readonly completedActions: GameAction[];
  readonly currentPlayer: string;
  readonly currentBrokenDoor: string;
  readonly staging: boolean;
  readonly stagingReadyPlayers: string[];
  readonly battleApprovedPlayers: string[];
  readonly stagingTimeSeconds: number;
  readonly battleTimeSeconds: number;
}
