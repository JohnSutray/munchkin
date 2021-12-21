import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';
import { insertItem, replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { without } from 'lodash';
import { UnequipItemPayload } from 'libs/api-interfaces/src/lib/actions/payloads/unequip-item.payload';


export const unequipItemActionHandler: MutatorActionHandler<UnequipItemPayload> = (game, payload) => ({
  ...game,
  players: replace(
    game.players,
    { id: payload.playerId },
    player => {
      return ({
        ...player,
        items: [...without(player.items, payload.itemId)],
        cards: insertItem(player.cards, payload.itemId, payload.newIndexInDeck),
      });
    },
  ),
});
