import { MutatorActionHandler } from 'apps/api/src/app/actions/mutator-action-handler';
import { insertItem, replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { getItemType } from 'libs/api-interfaces/src/lib/cards/cards-collection';
import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { without } from 'lodash-es';


export interface UnequipItemPayload {
  readonly playerId: string;
  readonly itemId: string;
  readonly newIndexInDeck: number;
}

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
