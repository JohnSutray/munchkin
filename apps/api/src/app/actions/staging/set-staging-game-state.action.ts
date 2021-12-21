import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';
import { SetStagingGameStatePayload } from 'libs/api-interfaces/src/lib/actions/payloads/set-staging-game-state.payload';


export const setStagingGameStateActionHandler: MutatorActionHandler<SetStagingGameStatePayload> = (
  game, { staging },
) => ({
  ...game,
  staging,
  stagingReadyPlayers: [],
});
