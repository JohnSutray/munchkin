import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { DoorBreakPayload } from 'libs/api-interfaces/src/lib/actions/payloads/door-break.payload';
import { GameActions } from 'libs/api-interfaces/src/lib/actions';


export const breakDoorActionHandler: GeneratorActionHandler<DoorBreakPayload> = () => [
  createAction(GameActions.setBrokenDoorAction),
  createAction(GameActions.checkBrokenDoorAction),
];
