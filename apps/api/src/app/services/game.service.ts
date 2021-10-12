import { filter } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { generatorActionHandlers, getActionType, mutatorActionHandlers } from '../actions/action-handlers';
import { cloneDeep, last } from 'lodash';
import { createAction } from 'apps/api/src/app/actions/create-action';
import { Game, GameAction, Player } from 'libs/api-interfaces/src/lib/models';
import { startGameAction } from 'libs/api-interfaces/src/lib/actions';
import { doorsCollection, treasuresCollection } from 'libs/api-interfaces/src/lib/cards/cards-collection';
import { ActionTypeEnum } from 'libs/api-interfaces/src/lib/enums/action-type.enum';


export interface GameChange {
  readonly gameId: string;
  readonly difference: Game[];
}

@Injectable()
export class GameService {
  private readonly gameChanged$ = new Subject<GameChange>();

  readonly testPlayer1: Player = {
    id: 'test-player-1',
    cards: [],
    level: 1,
    races: [],
    classes: [],
    lastDiceValue: 0,
    items: [],
  };

  readonly testPlayer2: Player = {
    id: 'test-player-1',
    cards: [],
    level: 1,
    races: [],
    classes: [],
    lastDiceValue: 0,
    items: [],
  };

  private readonly testInitialGameState: Game = {
    id: '1',
    doors: doorsCollection.map(({ id }) => id),
    doorsDrop: [],
    treasures: treasuresCollection.map(({ id }) => id),
    treasuresDrop: [],
    players: [
      this.testPlayer1,
      this.testPlayer2,
    ],
    completedActions: [],
    firstPlayer: '',
    currentAction: createAction(startGameAction),
  };

  private readonly gamesSnapshots: { [key: string]: Game[] } = {
    [this.testInitialGameState.id]: [this.testInitialGameState],
  };

  private readonly games: { [key: string]: Game } = {
    [this.testInitialGameState.id]: this.testInitialGameState,
  };

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
          game = mutatorActionHandlers[action.name](game);
          break;
        case ActionTypeEnum.GENERATOR:
          actions.unshift(...generatorActionHandlers[action.name](game));
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
