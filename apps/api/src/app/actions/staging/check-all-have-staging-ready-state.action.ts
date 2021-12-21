import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { doorBreakPromtAction, setStagingGameStateAction } from 'libs/api-interfaces/src/lib/actions';
import { SetStagingGameStatePayload } from 'libs/api-interfaces/src/lib/actions/payloads/set-staging-game-state.payload';

export const checkAllHaveStagingReadyStateActionHandler: GeneratorActionHandler = (game) =>
  game.players.length === game.stagingReadyPlayers.length
    ? [
      createAction<SetStagingGameStatePayload>(setStagingGameStateAction, { staging: false }),
      createAction(doorBreakPromtAction),
    ]
    : [];
