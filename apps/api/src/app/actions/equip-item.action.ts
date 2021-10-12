import { without } from 'lodash';
import { MutatorActionHandler } from 'apps/api/src/app/actions/mutator-action-handler';
import { replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';


export interface EquipItemPayload {
  readonly playerId: string;
  readonly itemId: string;
}

export const equipItemActionHandler: MutatorActionHandler<EquipItemPayload> = (game, payload) => ({
  ...game,
  players: replace(
    game.players,
    { id: payload.playerId },
    player => ({
      ...player,
      cards: without(player.cards, payload.itemId),
      items: [...player.items, payload.itemId],
    }),
  ),
});
