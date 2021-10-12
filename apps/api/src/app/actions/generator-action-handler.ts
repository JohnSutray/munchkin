import { Game, GameAction } from 'libs/api-interfaces/src/lib/models';

export type GeneratorActionHandler<TPayload = any> = (game: Game, payload?: TPayload) => GameAction[];
