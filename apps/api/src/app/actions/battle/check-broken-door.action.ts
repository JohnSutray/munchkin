import { GeneratorActionHandler } from '../models/generator-action-handler';
import { isCreature } from '../../../../../../libs/api-interfaces/src/lib/cards/cards-collection';
import { createAction } from '../../../../../../libs/api-interfaces/src/lib/actions/create-action';
import { startBattleAction } from '../../../../../../libs/api-interfaces/src/lib/actions';

export const checkBrokenDoorActionHandler: GeneratorActionHandler = (game) => {
  if (isCreature(game.currentBrokenDoor)) {
    return [
      createAction(startBattleAction),
    ];
  }
};
