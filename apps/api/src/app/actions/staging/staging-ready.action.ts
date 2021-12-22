import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { SetPlayerReadyStatePayload } from 'libs/api-interfaces/src/lib/actions/payloads/set-player-ready-state.payload';
import { ApproveStagingReadyStatePayload } from 'libs/api-interfaces/src/lib/actions/payloads/approve-staging-ready-state.payload';
import { GameActions } from 'libs/api-interfaces/src/lib/actions';


export const approveStagingReadyStateActionHandler: GeneratorActionHandler<ApproveStagingReadyStatePayload> = (
  game, payload
) => [
  createAction<SetPlayerReadyStatePayload>(GameActions.setPlayerReadyStateAction, { playerId: payload.playerId }),
  createAction(GameActions.checkAllHaveStagingReadyStateAction),
];
