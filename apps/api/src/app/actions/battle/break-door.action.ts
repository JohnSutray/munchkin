import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { checkBrokenDoorAction, setBrokenDoorAction } from 'libs/api-interfaces/src/lib/actions';
import { DoorBreakPayload } from 'libs/api-interfaces/src/lib/actions/payloads/door-break.payload';


export const breakDoorActionHandler: GeneratorActionHandler<DoorBreakPayload> = () => [
  createAction(setBrokenDoorAction),
  createAction(checkBrokenDoorAction),
];
