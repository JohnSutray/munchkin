import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';
import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { ActionTypeEnum } from 'libs/api-interfaces/src/lib/enums/action-type.enum';
import {
  approveStagingReadyStateAction, battleApproveAction, breakDoorAction,
  checkAllHaveStagingReadyStateAction, checkBrokenDoorAction,
  checkSingleDiceWinnerAction,
  dialDoorAction,
  dialTreasureAction,
  diceThrowAction,
  doorBreakPromtAction,
  equipItemAction,
  moveCardAction,
  selectFirstPlayer, setBattleApproveStateAction, setBrokenDoorAction,
  setPlayerReadyStateAction,
  setStagingGameStateAction, startBattleAction,
  startGameAction,
  startStagingAction,
  unequipItemAction,
} from 'libs/api-interfaces/src/lib/actions';
import { setPlayerReadyStateActionHandler } from 'apps/api/src/app/actions/staging/set-player-ready-state.action';
import { dialDoorActionHandler } from 'apps/api/src/app/actions/common/dial-door.action';
import { dialTreasureActionHandler } from 'apps/api/src/app/actions/common/dial-treasure.action';
import { diceThrowActionHandler } from 'apps/api/src/app/actions/common/dice-throw.action';
import { selectFirstPlayerActionHandler } from 'apps/api/src/app/actions/start/select-first-player.action';
import { equipItemActionHandler } from 'apps/api/src/app/actions/staging/equip-item.action';
import { unequipItemActionHandler } from 'apps/api/src/app/actions/staging/unequip-item.action';
import { moveCardActionHandler } from 'apps/api/src/app/actions/common/move-card.action';
import { checkSingleDiceWinnerActionHandler } from 'apps/api/src/app/actions/start/check-single-dice-winner.action';
import { startGameActionHandler } from 'apps/api/src/app/actions/start/start-game.action';
import { startStagingActionHandler } from 'apps/api/src/app/actions/staging/start-staging.action';
import { checkAllHaveStagingReadyStateActionHandler } from 'apps/api/src/app/actions/staging/check-all-have-staging-ready-state.action';
import { approveStagingReadyStateActionHandler } from 'apps/api/src/app/actions/staging/staging-ready.action';
import { setStagingGameStateActionHandler } from 'apps/api/src/app/actions/staging/set-staging-game-state.action';
import { doorBreakPromtActionHandler } from 'apps/api/src/app/actions/battle/door-break-promt.action';
import { breakDoorActionHandler } from 'apps/api/src/app/actions/battle/break-door.action';
import { setBrokenDoorActionHandler } from 'apps/api/src/app/actions/battle/set-broken-door.action';
import { checkBrokenDoorActionHandler } from './battle/check-broken-door.action';
import { startBattleActionHandler } from './battle/start-battle.action';
import { battleApproveActionHandler } from 'apps/api/src/app/actions/battle/battle-approve.action';
import {
  setBattleApproveStateActionHandler
} from 'apps/api/src/app/actions/battle/set-battle-approve-state.action-handler';


const mutatorActionHandlers: { [key: string]: MutatorActionHandler } = {
  [dialDoorAction]: dialDoorActionHandler,
  [dialTreasureAction]: dialTreasureActionHandler,
  [diceThrowAction]: diceThrowActionHandler,
  [selectFirstPlayer]: selectFirstPlayerActionHandler,
  [equipItemAction]: equipItemActionHandler,
  [unequipItemAction]: unequipItemActionHandler,
  [moveCardAction]: moveCardActionHandler,
  [setPlayerReadyStateAction]: setPlayerReadyStateActionHandler,
  [setStagingGameStateAction]: setStagingGameStateActionHandler,
  [setBrokenDoorAction]: setBrokenDoorActionHandler,
  [setBattleApproveStateAction]: setBattleApproveStateActionHandler,
};

const generatorActionHandlers: { [key: string]: GeneratorActionHandler } = {
  [checkAllHaveStagingReadyStateAction]: checkAllHaveStagingReadyStateActionHandler,
  [checkSingleDiceWinnerAction]: checkSingleDiceWinnerActionHandler,
  [startGameAction]: startGameActionHandler,
  [startStagingAction]: startStagingActionHandler,
  [approveStagingReadyStateAction]: approveStagingReadyStateActionHandler,
  [doorBreakPromtAction]: doorBreakPromtActionHandler,
  [breakDoorAction]: breakDoorActionHandler,
  [startBattleAction]: startBattleActionHandler,
  [checkBrokenDoorAction]: checkBrokenDoorActionHandler,
  [battleApproveAction]: battleApproveActionHandler,
};

export const getMutatorActionHandler = (handlerName: string): MutatorActionHandler => {
  const handler = mutatorActionHandlers[handlerName];

  if (!handler) {
    throw new Error(`${handlerName} mutator is not registered!`);
  }

  return handler;
}

export const getGeneratorActionHandler = (handlerName: string): GeneratorActionHandler => {
  const handler = generatorActionHandlers[handlerName];

  if (!handler) {
    throw new Error(`${handlerName} mutator is not registered!`);
  }

  return handler;
}

export const getActionType = (actionName: string): ActionTypeEnum => {
  if (Object.keys(mutatorActionHandlers).includes(actionName)) {
    return ActionTypeEnum.MUTATOR;
  }

  if (Object.keys(generatorActionHandlers)) {
    return ActionTypeEnum.GENERATOR;
  }

  throw new Error(`Unknown action type ${actionName}`);
};
