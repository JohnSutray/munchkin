import { filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { getActionType, getGeneratorActionHandler, getMutatorActionHandler } from '../actions/action-handlers';
import { createAction } from 'libs/api-interfaces/src/lib/actions/create-action';
import { GameChange, startGameAction } from 'libs/api-interfaces/src/lib/actions';
import { doorsCollection, treasuresCollection } from 'libs/api-interfaces/src/lib/cards/cards-collection';
import { ActionTypeEnum } from 'libs/api-interfaces/src/lib/enums/action-type.enum';
import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { Game } from 'libs/api-interfaces/src/lib/models/game';
import { GameAction } from 'libs/api-interfaces/src/lib/models/action';
import { cloneDeep, last } from 'lodash';


@Injectable()
export class GameService {
  private readonly gameChanged$ = new Subject<GameChange>();

  readonly testPlayer1: Player = {
    id: '1',
    cards: [],
    level: 1,
    races: [],
    classes: [],
    lastDiceValue: 0,
    items: [],
    name: 'Andy',
  };

  readonly testPlayer2: Player = {
    id: '2',
    cards: [],
    level: 1,
    races: [],
    classes: [],
    lastDiceValue: 0,
    items: [],
    name: 'Roman',
  };

  private readonly testInitialGameState: Game = {
    id: '1',
    doors: [...doorsCollection],
    doorsDrop: [],
    treasures: [...treasuresCollection],
    treasuresDrop: [],
    players: [
      this.testPlayer1,
      // this.testPlayer2,
    ],
    completedActions: [],
    currentPlayer: '',
    currentBrokenDoor: '',
    currentAction: createAction(startGameAction),
    staging: false,
    stagingReadyPlayers: [],
    battleApprovedPlayers: [],
    battleTimeSeconds: 60,
    stagingTimeSeconds: 60,
  };

  private readonly gamesSnapshots: { [key: string]: Game[] } = {
    [this.testInitialGameState.id]: [],
  };

  private readonly games: { [key: string]: Game } = {
    [this.testInitialGameState.id]: cloneDeep(this.testInitialGameState),
  };

  resetTestGameState(): void {
    this.gamesSnapshots[this.testInitialGameState.id] = [];
    this.games[this.testInitialGameState.id] = cloneDeep(this.testInitialGameState);
    this.gameChanged$.next({
      gameId: this.games[this.testInitialGameState.id].id,
      difference: [this.games[this.testInitialGameState.id]],
    });
  }

  registerAction(id: string, action: GameAction): void {
    const game = this.games[id];
    const difference = this.performActions(game, action);
    this.games[id] = last(difference);
    this.gameChanged$.next({ gameId: id, difference });
  }

  onGameChange$(id: string): Observable<GameChange> {
    return this.gameChanged$.pipe(filter(({ gameId }) => gameId === id));
  }

  private snapShotGame = (game: Game) => this.findGameSnapshots(game.id).push(cloneDeep(game));

  private performActions(game: Game, action: GameAction): Game[] {
    const actions = [action];
    const lastSnapShotsLength = this.findGameSnapshots(game.id).length;

    while (actions.length) {
      action = actions.shift();

      game = {
        ...game,
        currentAction: action,
        completedActions: [...game.completedActions, game.currentAction],
      };

      switch (getActionType(action.name)) {
        case ActionTypeEnum.MUTATOR:
          game = getMutatorActionHandler(action.name)(game, action.payload);
          break;
        case ActionTypeEnum.GENERATOR:
          actions.unshift(...getGeneratorActionHandler(action.name)(game, action.payload));
          break;
      }

      this.snapShotGame(game);
    }

    return this.findGameSnapshots(game.id).slice(lastSnapShotsLength);
  }

  private findGameSnapshots(id: string): Game[] {
    if (!this.gamesSnapshots[id]) {
      this.gamesSnapshots[id] = [];
    }

    return this.gamesSnapshots[id];
  }
}
