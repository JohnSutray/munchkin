import { MutatorActionHandler } from '../models/mutator-action-handler';
import { uniq, without } from 'lodash';
import {
  BattleApprovePayload
} from '../../../../../../libs/api-interfaces/src/lib/actions/payloads/battle-approve.payload';

export const setBattleApproveStateActionHandler: MutatorActionHandler<BattleApprovePayload> = (game, payload) => ({
  ...game,
  battleApprovedPlayers: payload.approved
    ? uniq([...game.battleApprovedPlayers, payload.playerId])
    : without(game.battleApprovedPlayers, payload.playerId),
});
