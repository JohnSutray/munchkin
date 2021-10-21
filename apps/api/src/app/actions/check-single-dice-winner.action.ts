import { createSelectFirstPlayerAction } from 'apps/api/src/app/actions/select-first-player.action';
import { Player } from 'libs/api-interfaces/src/lib/models';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { createDiceThrowAction } from 'apps/api/src/app/actions/dice-throw.action';
import { startStagingAction } from 'libs/api-interfaces/src/lib/actions';
import { GeneratorActionHandler } from 'apps/api/src/app/actions/generator-action-handler';
import { filter, maxBy } from 'lodash';


export const checkSingleDiceWinnerAction = 'checkSingleDiceWinnerAction';

export const createCheckSingleDiceWinnerAction = () => createAction(checkSingleDiceWinnerAction);

export const checkSingleDiceWinnerActionHandler: GeneratorActionHandler = game => {
  const { lastDiceValue } = maxBy(game.players, 'lastDiceValue');
  const playersWithMaxValue = filter<Player>(game.players, { lastDiceValue });

  if (playersWithMaxValue.length > 1) {
    return [
      ...playersWithMaxValue.map(createDiceThrowAction),
      createCheckSingleDiceWinnerAction(),
    ];
  }

  return [
    createSelectFirstPlayerAction(playersWithMaxValue[0]),
    createAction(startStagingAction),
  ];
};

