import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { SetStagingGameStatePayload } from 'libs/api-interfaces/src/lib/actions/payloads/set-staging-game-state.payload';
import { GameActions } from 'libs/api-interfaces/src/lib/actions';

export const checkAllHaveStagingReadyStateActionHandler: GeneratorActionHandler = (game) =>
  game.players.length === game.stagingReadyPlayers.length
    ? [
      createAction<SetStagingGameStatePayload>(GameActions.setStagingGameStateAction, { staging: false }),
      createAction(GameActions.doorBreakPromtAction),
    ]
    : [];
