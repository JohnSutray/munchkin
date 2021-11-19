import { MutatorActionHandler } from 'apps/api/src/app/actions/mutator-action-handler';
import { replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { moveItemInArray } from '@angular/cdk/drag-drop';


export interface MoveCardPayload {
  readonly playerId: string;
  readonly itemId: string;
  readonly newIndex: number;
}

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
