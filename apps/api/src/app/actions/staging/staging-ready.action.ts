import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { checkAllHaveStagingReadyStateAction, setPlayerReadyStateAction } from 'libs/api-interfaces/src/lib/actions';
import { SetPlayerReadyStatePayload } from 'libs/api-interfaces/src/lib/actions/payloads/set-player-ready-state.payload';
import { ApproveStagingReadyStatePayload } from 'libs/api-interfaces/src/lib/actions/payloads/approve-staging-ready-state.payload';


export const approveStagingReadyStateActionHandler: GeneratorActionHandler<ApproveStagingReadyStatePayload> = (
  game, payload
) => [
  createAction<SetPlayerReadyStatePayload>(setPlayerReadyStateAction, { playerId: payload.playerId }),
  createAction(checkAllHaveStagingReadyStateAction),
];
