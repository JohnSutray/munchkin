import { createCheckSingleDiceWinnerAction } from 'apps/api/src/app/actions/check-single-dice-winner.action';
import { createDialDoorAction } from 'apps/api/src/app/actions/dial-door.action';
import { createDialTreasureAction } from 'apps/api/src/app/actions/dial-treasure.action';
import { GeneratorActionHandler } from 'apps/api/src/app/actions/generator-action-handler';
import { flatMap } from 'lodash';


export const startGameActionHandler: GeneratorActionHandler = game => [
  ...flatMap(
    game.players,
    player => [
      createDialDoorAction(player),
      createDialTreasureAction(player),
    ],
  ),

  createCheckSingleDiceWinnerAction(),
];
