import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { setStagingGameStateAction } from 'libs/api-interfaces/src/lib/actions';
import { SetStagingGameStatePayload } from 'libs/api-interfaces/src/lib/actions/payloads/set-staging-game-state.payload';

export const startStagingActionHandler: GeneratorActionHandler = () => [
  createAction<SetStagingGameStatePayload>(setStagingGameStateAction, { staging: true }),
];
