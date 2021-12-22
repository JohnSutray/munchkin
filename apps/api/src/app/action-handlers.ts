import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';
import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { GameActions } from 'libs/api-interfaces/src/lib/actions';
import { battleApproveActionHandler } from 'apps/api/src/app/actions/battle/battle-approve.action'
import { breakDoorActionHandler } from 'apps/api/src/app/actions/battle/break-door.action'
import { checkBrokenDoorActionHandler } from 'apps/api/src/app/actions/battle/check-broken-door.action'
import { doorBreakPromtActionHandler } from 'apps/api/src/app/actions/battle/door-break-promt.action'
import { setBattleApproveStateActionHandler } from 'apps/api/src/app/actions/battle/set-battle-approve-state.action-handler'
import { setBrokenDoorActionHandler } from 'apps/api/src/app/actions/battle/set-broken-door.action'
import { startBattleActionHandler } from 'apps/api/src/app/actions/battle/start-battle.action'
import { dialDoorActionHandler } from 'apps/api/src/app/actions/common/dial-door.action'
import { dialTreasureActionHandler } from 'apps/api/src/app/actions/common/dial-treasure.action'
import { diceThrowActionHandler } from 'apps/api/src/app/actions/common/dice-throw.action'
import { moveCardActionHandler } from 'apps/api/src/app/actions/common/move-card.action'
import { checkAllHaveStagingReadyStateActionHandler } from 'apps/api/src/app/actions/staging/check-all-have-staging-ready-state.action'
import { equipItemActionHandler } from 'apps/api/src/app/actions/staging/equip-item.action'
import { setPlayerReadyStateActionHandler } from 'apps/api/src/app/actions/staging/set-player-ready-state.action'
import { setStagingGameStateActionHandler } from 'apps/api/src/app/actions/staging/set-staging-game-state.action'
import { approveStagingReadyStateActionHandler } from 'apps/api/src/app/actions/staging/staging-ready.action'
import { startStagingActionHandler } from 'apps/api/src/app/actions/staging/start-staging.action'
import { unequipItemActionHandler } from 'apps/api/src/app/actions/staging/unequip-item.action'
import { checkSingleDiceWinnerActionHandler } from 'apps/api/src/app/actions/start/check-single-dice-winner.action'
import { selectFirstPlayerActionHandler } from 'apps/api/src/app/actions/start/select-first-player.action'
import { startGameActionHandler } from 'apps/api/src/app/actions/start/start-game.action'

export const mutatorActionHandlers: { [key: string]: MutatorActionHandler } = {
  [GameActions.setBattleApproveStateAction]: setBattleApproveStateActionHandler,
  [GameActions.setBrokenDoorAction]: setBrokenDoorActionHandler,
  [GameActions.dialDoorAction]: dialDoorActionHandler,
  [GameActions.dialTreasureAction]: dialTreasureActionHandler,
  [GameActions.diceThrowAction]: diceThrowActionHandler,
  [GameActions.moveCardAction]: moveCardActionHandler,
  [GameActions.equipItemAction]: equipItemActionHandler,
  [GameActions.setPlayerReadyStateAction]: setPlayerReadyStateActionHandler,
  [GameActions.setStagingGameStateAction]: setStagingGameStateActionHandler,
  [GameActions.unequipItemAction]: unequipItemActionHandler,
  [GameActions.selectFirstPlayerAction]: selectFirstPlayerActionHandler,
};

export const generatorActionHandlers: { [key: string]: GeneratorActionHandler } = {
  [GameActions.battleApproveAction]: battleApproveActionHandler,
  [GameActions.breakDoorAction]: breakDoorActionHandler,
  [GameActions.checkBrokenDoorAction]: checkBrokenDoorActionHandler,
  [GameActions.doorBreakPromtAction]: doorBreakPromtActionHandler,
  [GameActions.startBattleAction]: startBattleActionHandler,
  [GameActions.checkAllHaveStagingReadyStateAction]: checkAllHaveStagingReadyStateActionHandler,
  [GameActions.approveStagingReadyStateAction]: approveStagingReadyStateActionHandler,
  [GameActions.startStagingAction]: startStagingActionHandler,
  [GameActions.checkSingleDiceWinnerAction]: checkSingleDiceWinnerActionHandler,
  [GameActions.startGameAction]: startGameActionHandler,
};