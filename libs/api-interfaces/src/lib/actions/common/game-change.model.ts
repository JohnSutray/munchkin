import { Game } from 'libs/api-interfaces/src/lib/models/game';

export interface GameChange {
  readonly gameId: string;
  readonly difference: Game[];
}
