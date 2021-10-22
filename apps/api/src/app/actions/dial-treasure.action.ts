import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { last, replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { MutatorActionHandler } from 'apps/api/src/app/actions/mutator-action-handler';
import { DialCardPayload, dialTreasureAction } from 'libs/api-interfaces/src/lib/actions';
import { Player } from 'libs/api-interfaces/src/lib/models/player';


export const createDialTreasureAction = (player: Player) => createAction<DialCardPayload>(dialTreasureAction, { playerId: player.id });

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

