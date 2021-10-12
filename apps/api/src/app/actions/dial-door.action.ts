import { createAction } from './create-action';
import { MutatorActionHandler } from './mutator-action-handler';
import { last } from 'lodash';
import { Player } from 'libs/api-interfaces/src/lib/models';
import { dialDoorAction, DialDoorPayload } from 'libs/api-interfaces/src/lib/actions';
import { replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';


export const createDialDoorAction = (player: Player) => createAction<DialDoorPayload>(dialDoorAction, { playerId: player.id });

export const dialDoorActionHandler: MutatorActionHandler<DialDoorPayload> = (game, payload) => {
  const door = last(game.doors);

  return ({
    ...game,
    doors: game.doors.slice(0, game.doors.length - 1),
    players: replace(
      game.players,
      { id: payload.playerId },
      player => ({ ...player, cards: [...player.cards, door] }),
    ),
  });
};

