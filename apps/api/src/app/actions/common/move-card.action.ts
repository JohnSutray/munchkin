import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';
import { replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { MoveCardPayload } from 'libs/api-interfaces/src/lib/actions/payloads/move-card.payload';


export const moveCardActionHandler: MutatorActionHandler<MoveCardPayload> = (
  game, payload
) => ({
  ...game,
  players: replace(
    game.players,
    { id: payload.playerId },
    player => {
      const reorderedCards = [...player.cards];
      const indexOfPreviousPosition = player.cards.indexOf(payload.itemId);

      moveItemInArray(reorderedCards, indexOfPreviousPosition, payload.newIndex);

      return ({
        ...player,
        cards: reorderedCards,
      });
    },
  ),
});
