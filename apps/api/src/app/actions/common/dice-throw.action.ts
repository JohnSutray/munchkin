import { replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';
import { random } from 'lodash';
import { DiceThrowPayload } from 'libs/api-interfaces/src/lib/actions/payloads/dice-throw.payload';


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
