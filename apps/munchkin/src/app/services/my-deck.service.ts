import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { doorsId, treasuresId } from 'apps/munchkin/src/app/constants/workspace.constants';
import { CardPlaceholderService } from 'apps/munchkin/src/app/services/card-placeholder.service';
import { CardMoveOverlayService } from 'apps/munchkin/src/app/services/card-move-overlay.service';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { afterNextViewInit } from 'apps/munchkin/src/app/utils/angular.utils';
import { GameIterationService } from 'apps/munchkin/src/app/services/game-iteration.service';
import { Game } from 'libs/api-interfaces/src/lib/models/game';
import { PlayerDataService } from 'apps/munchkin/src/app/services/player-data.service';
import { cardMoveTransitionTime } from 'apps/munchkin/src/app/constants/animation.constants';
import { Player } from 'libs/api-interfaces/src/lib/models/player';
import { last, without } from 'lodash';
import { GameActions } from 'libs/api-interfaces/src/lib/actions';
import { DialCardPayload } from 'libs/api-interfaces/src/lib/actions/payloads/dial-card.payload';

interface CardDialData {
  readonly cardId: string;
  readonly deckId: string;
}

@Injectable()
export class MyDeckService {
  private readonly _cards$ = new BehaviorSubject<string[]>([]);

  private readonly cardDialUpdates$ = merge(
    this.gameIterationService.updatesOfType$(GameActions.dialDoorAction),
    this.gameIterationService.updatesOfType$(GameActions.dialTreasureAction),
  ).pipe(
    filter(this.onlyForCurrentPlayer.bind(this)),
  );

  private actionTypeToDeckIdMap = {
    [GameActions.dialDoorAction]: doorsId,
    [GameActions.dialTreasureAction]: treasuresId,
  };

  readonly cards$ = this._cards$.asObservable();

  get cards(): string[] {
    return this._cards$.value;
  }

  constructor(
    private readonly cardPlaceholderService: CardPlaceholderService,
    private readonly cardMoveOverlayService: CardMoveOverlayService,
    private readonly gameIterationService: GameIterationService,
    private readonly playerDataService: PlayerDataService,
  ) {
  }

  startHandlingOfMyDeckActions(takeUntil: MonoTypeOperatorFunction<Game>): void {
    this.cardDialUpdates$.pipe(
      takeUntil,
      map(this.animateGetCardFromDeck),
    ).subscribe(this.gameIterationService.registerTask);
  }

  observeCards(takeUntil: MonoTypeOperatorFunction<Player>): void {
    this.playerDataService.player$.pipe(
      takeUntil,
      map(({ cards }) => cards)
    ).subscribe(this._cards$);
  }

  setCards(cards: string[]): void {
    this._cards$.next(cards);
  }

  removeCardLocally(cardId: string): void {
    this.setCards(without(this.cards, cardId));
  }

  private animateGetCardFromDeck = (update: Game): Observable<any> => {
    return of(update).pipe(
      map(this.toCardDialData),
      switchMap(afterNextViewInit),
      tap(this.startCardMovingAnimation),
      delay(cardMoveTransitionTime),
    );
  };

  private toCardDialData = (update: Game): CardDialData => ({
    cardId: last(this.playerDataService.player.cards),
    deckId: this.actionTypeToDeckIdMap[update.currentAction.name],
  });

  private onlyForCurrentPlayer(update: Game<DialCardPayload>): boolean {
    return update.currentAction.payload.playerId === this.playerDataService.player.id;
  }

  private startCardMovingAnimation = (
    { cardId, deckId }: CardDialData,
  ) => this.cardMoveOverlayService.startCardMoving({
    cardId: cardId,
    from: deckId,
  });
}
