import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';
import { replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { last } from 'lodash';
import { DialCardPayload } from '../../../../../../libs/api-interfaces/src/lib/actions/payloads/dial-card.payload';


export const dialDoorActionHandler: MutatorActionHandler<DialCardPayload> = (game, payload) => {
  const door = last(game.doors);

  return ({
    ...game,
    doors: game.doors.slice(0, game.doors.length - 1),
    players: replace<Player>(
      game.players,
      { id: payload.playerId },
      player => ({ ...player, cards: [...player.cards, door] }),
    ),
  });
};

