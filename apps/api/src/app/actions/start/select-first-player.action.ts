import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';
import { SelectFirstPlayerPayload } from 'libs/api-interfaces/src/lib/actions/payloads/select-first-player.payload';

export const selectFirstPlayerActionHandler: MutatorActionHandler<SelectFirstPlayerPayload> = (game, payload) => {
  return ({
    ...game,
    currentPlayer: payload.playerId,
  });
};
