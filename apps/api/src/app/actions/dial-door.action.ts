import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { MutatorActionHandler } from './mutator-action-handler';
import { dialDoorAction, DialCardPayload } from 'libs/api-interfaces/src/lib/actions';
import { replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { last } from 'lodash-es';


export const createDialDoorAction = (player: Player) => createAction<DialCardPayload>(dialDoorAction, { playerId: player.id });

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

