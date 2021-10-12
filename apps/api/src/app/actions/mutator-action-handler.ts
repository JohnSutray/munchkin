import { Game } from 'libs/api-interfaces/src/lib/models';

export type MutatorActionHandler<TPayload = any> = (game: Game, payload?: TPayload) => Game;
