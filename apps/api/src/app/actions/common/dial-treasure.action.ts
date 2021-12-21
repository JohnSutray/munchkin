import { replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';
import { last } from 'lodash';
import { DialCardPayload } from '../../../../../../libs/api-interfaces/src/lib/actions/payloads/dial-card.payload';


export const dialTreasureActionHandler: MutatorActionHandler<DialCardPayload> = (game, payload) => {
  const door = last(game.treasures);

  return ({
    ...game,
    treasures: game.treasures.slice(0, game.treasures.length - 1),
    players: replace(
      game.players,
      { id: payload.playerId },
      player => ({ ...player, cards: [...player.cards, door] }),
    ),
  });
};

