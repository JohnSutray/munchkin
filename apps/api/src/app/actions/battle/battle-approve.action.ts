import { GeneratorActionHandler } from '../models/generator-action-handler';
import { BattleApprovePayload } from 'libs/api-interfaces/src/lib/actions/payloads/battle-approve.payload';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { GameActions } from 'libs/api-interfaces/src/lib/actions';

export const battleApproveActionHandler: GeneratorActionHandler<BattleApprovePayload> = (game, payload) => [
  createAction<BattleApprovePayload>(GameActions.setBattleApproveStateAction, payload),

];
