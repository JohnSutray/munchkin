import { MutatorActionHandler } from 'apps/api/src/app/actions/mutator-action-handler';
import { replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { getItemType } from 'libs/api-interfaces/src/lib/cards/cards-collection';
import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { without } from 'lodash-es';


export interface EquipItemPayload {
  readonly playerId: string;
  readonly itemId: string;
}

interface EquipResult {
  readonly items: string[];
  readonly cards: string[];
}

export const equipItemActionHandler: MutatorActionHandler<EquipItemPayload> = (game, payload) => ({
  ...game,
  players: replace(
    game.players,
    { id: payload.playerId },
    player => ({
      ...player,
      ...equipOrReplaceItem(player, payload.itemId),
    }),
  ),
});

const equipOrReplaceItem = (player: Player, itemId: string): EquipResult => {
  const typeOfItem = getItemType(itemId);
  const alreadyEquippedItem = player.items.find(
    otherItem => typeOfItem === getItemType(otherItem),
  );
  const cards = alreadyEquippedItem
    ? [...without(player.cards, itemId), alreadyEquippedItem]
    : without(player.cards, itemId);
  const items = alreadyEquippedItem
    ? [...without(player.items, alreadyEquippedItem), itemId]
    : [...player.items, itemId];

  return { items, cards };
};
