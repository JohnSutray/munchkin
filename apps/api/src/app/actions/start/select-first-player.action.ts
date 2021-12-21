import { selectFirstPlayer } from 'libs/api-interfaces/src/lib/actions';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';
import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { SelectFirstPlayerPayload } from 'libs/api-interfaces/src/lib/actions/payloads/select-first-player.payload';


export const createSelectFirstPlayerAction = (player: Player) => createAction<SelectFirstPlayerPayload>(selectFirstPlayer, { playerId: player.id });

export const selectFirstPlayerActionHandler: MutatorActionHandler<SelectFirstPlayerPayload> = (game, payload) => {
  return ({
    ...game,
    currentPlayer: payload.playerId,
  });
};
