import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';
import { SetPlayerReadyStatePayload } from 'libs/api-interfaces/src/lib/actions/payloads/set-player-ready-state.payload';


export const setPlayerReadyStateActionHandler: MutatorActionHandler<SetPlayerReadyStatePayload> = (
  game, payload,
) => ({
  ...game,
  stagingReadyPlayers: [...game.stagingReadyPlayers, payload.playerId],
});
