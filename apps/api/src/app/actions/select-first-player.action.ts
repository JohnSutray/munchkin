import { Player } from 'libs/api-interfaces/src/lib/models';
import { selectFirstPlayer } from 'libs/api-interfaces/src/lib/actions';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { MutatorActionHandler } from 'apps/api/src/app/actions/mutator-action-handler';


export interface SelectFirstPlayerPayload {
  readonly playerId: string;
}

export const createSelectFirstPlayerAction = (player: Player) => createAction<SelectFirstPlayerPayload>(selectFirstPlayer, { playerId: player.id });

export const selectFirstPlayerActionHandler: MutatorActionHandler<SelectFirstPlayerPayload> = (game, payload) => {
  return ({
    ...game,
    firstPlayer: payload.playerId,
  });
};
