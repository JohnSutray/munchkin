import { Game } from 'libs/api-interfaces/src/lib/models/game';

export type MutatorActionHandler<TPayload = any> = (game: Game, payload?: TPayload) => Game;
