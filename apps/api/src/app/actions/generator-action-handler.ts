import { GameAction } from 'libs/api-interfaces/src/lib/models/action';
import { Game } from 'libs/api-interfaces/src/lib/models/game';

export type GeneratorActionHandler<TPayload = any> = (game: Game, payload?: TPayload) => GameAction[];
