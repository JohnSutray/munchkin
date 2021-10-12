import { random } from 'lodash';
import { Player } from 'libs/api-interfaces/src/lib/models';
import { createAction } from 'apps/api/src/app/actions/create-action';
import { replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { MutatorActionHandler } from 'apps/api/src/app/actions/mutator-action-handler';
import { diceThrowAction } from 'libs/api-interfaces/src/lib/actions';


export interface DiceThrowPayload {
  readonly playerId: string;
}

export const createDiceThrowAction = (player: Player) => createAction<DiceThrowPayload>(diceThrowAction, { playerId: player.id });

export const diceThrowActionHandler: MutatorActionHandler<DiceThrowPayload> = (game, payload) => {
  return ({
    ...game,
    players: replace(
      game.players,
      { id: payload.playerId },
      player => ({ ...player, lastDiceValue: random(1, 6) }),
    ),
  });
};
