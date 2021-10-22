import { startStagingActionHandler } from 'apps/api/src/app/actions/start-staging.action';
import {
  checkSingleDiceWinnerAction,
  checkSingleDiceWinnerActionHandler,
} from 'apps/api/src/app/actions/check-single-dice-winner.action';
import {
  dialDoorAction, dialTreasureAction,
  diceThrowAction,
  equipItemAction,
  selectFirstPlayer,
  startGameAction,
  startStagingAction,
} from 'libs/api-interfaces/src/lib/actions';
import {
  registerGeneratorActionHandler,
  registerMutationActionHandler,
} from 'apps/api/src/app/actions/action-handlers';
import {
  dialTreasureActionHandler,
} from 'apps/api/src/app/actions/dial-treasure.action';
import { startGameActionHandler } from 'apps/api/src/app/actions/start-game.action';
import { equipItemActionHandler } from 'apps/api/src/app/actions/equip-item.action';
import { diceThrowActionHandler } from 'apps/api/src/app/actions/dice-throw.action';
import { selectFirstPlayerActionHandler } from 'apps/api/src/app/actions/select-first-player.action';
import { dialDoorActionHandler } from 'apps/api/src/app/actions/dial-door.action';


export const initializeActions = () => {
  registerGeneratorActionHandler(checkSingleDiceWinnerAction, checkSingleDiceWinnerActionHandler);
  registerMutationActionHandler(dialDoorAction, dialDoorActionHandler);
  registerMutationActionHandler(dialTreasureAction, dialTreasureActionHandler);
  registerMutationActionHandler(diceThrowAction, diceThrowActionHandler);
  registerMutationActionHandler(selectFirstPlayer, selectFirstPlayerActionHandler);
  registerGeneratorActionHandler(startGameAction, startGameActionHandler);
  registerGeneratorActionHandler(startStagingAction, startStagingActionHandler);
  registerMutationActionHandler(equipItemAction, equipItemActionHandler);
};
