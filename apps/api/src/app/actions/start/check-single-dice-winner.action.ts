import { createSelectFirstPlayerAction } from 'apps/api/src/app/actions/start/select-first-player.action';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { createDiceThrowAction } from 'apps/api/src/app/actions/common/dice-throw.action';
import { checkSingleDiceWinnerAction, startStagingAction } from 'libs/api-interfaces/src/lib/actions';
import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { filter, maxBy } from 'lodash';

export const checkSingleDiceWinnerActionHandler: GeneratorActionHandler = game => {
  const { lastDiceValue } = maxBy(game.players, 'lastDiceValue');
  const playersWithMaxValue = filter<Player>(game.players, { lastDiceValue });

  if (playersWithMaxValue.length > 1) {
    return [
      ...playersWithMaxValue.map(createDiceThrowAction),
      createAction(checkSingleDiceWinnerAction),
    ];
  }

  return [
    createSelectFirstPlayerAction(playersWithMaxValue[0]),
    createAction(startStagingAction),
  ];
};

