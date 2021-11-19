import { createCheckSingleDiceWinnerAction } from 'apps/api/src/app/actions/check-single-dice-winner.action';
import { GeneratorActionHandler } from 'apps/api/src/app/actions/generator-action-handler';
import { createDialTreasureAction } from 'apps/api/src/app/actions/dial-treasure.action';
import { flatMap } from 'lodash-es';


export const startGameActionHandler: GeneratorActionHandler = game => [
  ...flatMap(
    game.players,
    player => [
      // createDialDoorAction(player),
      // createDialDoorAction(player),
      // createDialDoorAction(player),
      // createDialDoorAction(player),
      // createDialDoorAction(player),
      createDialTreasureAction(player),
      createDialTreasureAction(player),
      createDialTreasureAction(player),
      createDialTreasureAction(player),
      // createDialTreasureAction(player),
    ],
  ),

  createCheckSingleDiceWinnerAction(),
];
