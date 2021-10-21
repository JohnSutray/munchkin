import { Player } from 'libs/api-interfaces/src/lib/models';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { last, replace } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { MutatorActionHandler } from 'apps/api/src/app/actions/mutator-action-handler';
import { DialDoorPayload } from 'libs/api-interfaces/src/lib/actions';


export const dialTreasureAction = 'dialTreasureAction';

export interface DialTreasurePayload {
  readonly playerId: string;
}

export const createDialTreasureAction = (player: Player) => createAction<DialDoorPayload>(dialTreasureAction, { playerId: player.id });

export const dialTreasureActionHandler: MutatorActionHandler<DialTreasurePayload> = (game, payload) => {
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

