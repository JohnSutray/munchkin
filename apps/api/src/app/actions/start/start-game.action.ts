import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { flatMap } from 'lodash';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { DialCardPayload } from '../../../../../../libs/api-interfaces/src/lib/actions/payloads/dial-card.payload';
import { GameActions } from 'libs/api-interfaces/src/lib/actions';


export const startGameActionHandler: GeneratorActionHandler = game => [
  ...flatMap(
    game.players,
    player => [
      createAction<DialCardPayload>(GameActions.dialTreasureAction, { playerId: player.id }),
      createAction<DialCardPayload>(GameActions.dialTreasureAction, { playerId: player.id }),
      createAction<DialCardPayload>(GameActions.dialTreasureAction, { playerId: player.id }),
      createAction<DialCardPayload>(GameActions.dialTreasureAction, { playerId: player.id }),
      // createDialDoorAction(player),
      // createDialDoorAction(player),
      // createDialDoorAction(player),
      // createDialDoorAction(player),
      // createDialDoorAction(player),
      // createDialTreasureAction(player),
    ],
  ),

  createAction(GameActions.checkSingleDiceWinnerAction),
];
