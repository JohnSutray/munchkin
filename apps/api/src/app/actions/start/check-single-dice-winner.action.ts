import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { filter, maxBy } from 'lodash';
import { SelectFirstPlayerPayload } from 'libs/api-interfaces/src/lib/actions/payloads/select-first-player.payload';
import { GameActions } from 'libs/api-interfaces/src/lib/actions';
import { DiceThrowPayload } from 'libs/api-interfaces/src/lib/actions/payloads/dice-throw.payload';

export const checkSingleDiceWinnerActionHandler: GeneratorActionHandler = game => {
  const { lastDiceValue } = maxBy(game.players, 'lastDiceValue');
  const playersWithMaxValue = filter<Player>(game.players, { lastDiceValue });

  if (playersWithMaxValue.length > 1) {
    return [
      ...playersWithMaxValue.map(
        player => createAction<DiceThrowPayload>(GameActions.diceThrowAction, { playerId: player.id }),
      ),
      createAction(GameActions.checkSingleDiceWinnerAction),
    ];
  }

  return [
    createAction<SelectFirstPlayerPayload>(
      GameActions.selectFirstPlayerAction, { playerId: playersWithMaxValue[0].id },
    ),
    createAction(GameActions.startStagingAction),
  ];
};

