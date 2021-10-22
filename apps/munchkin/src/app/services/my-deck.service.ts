import { Injectable } from '@angular/core';
import { BehaviorSubject, merge, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { doorsId, treasuresId } from 'apps/munchkin/src/app/constants/workspace.constants';
import { CardPlaceholderService } from 'apps/munchkin/src/app/services/card-placeholder.service';
import { CardMoveOverlayService } from 'apps/munchkin/src/app/services/card-move-overlay.service';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { afterNextViewInit } from 'apps/munchkin/src/app/utils/angular.utils';
import { GameIterationService } from 'apps/munchkin/src/app/services/game-iteration.service';
import { dialDoorAction, DialCardPayload, dialTreasureAction } from 'libs/api-interfaces/src/lib/actions';
import { Game } from 'libs/api-interfaces/src/lib/models/game';
import { PlayerDataService } from 'apps/munchkin/src/app/services/player-data.service';
import { last } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { cardMoveTransitionTime } from 'apps/munchkin/src/app/constants/animation.constants';

interface CardDialData {
  readonly cardId: string;
  readonly deckId: string;
}

@Injectable()
export class MyDeckService {
  private readonly _cards$ = new BehaviorSubject<string[]>([]);

  private readonly cardDialUpdates$ = merge(
    this.gameIterationService.updatesOfType$(dialDoorAction),
    this.gameIterationService.updatesOfType$(dialTreasureAction),
  ).pipe(
    filter(this.onlyForCurrentPlayer.bind(this)),
  );

  private actionTypeToDeckIdMap = {
    [dialDoorAction]: doorsId,
    [dialTreasureAction]: treasuresId,
  };

  constructor(
    private readonly cardPlaceholderService: CardPlaceholderService,
    private readonly cardMoveOverlayService: CardMoveOverlayService,
    private readonly gameIterationService: GameIterationService,
    private readonly playerDataService: PlayerDataService,
  ) {
  }

  readonly cards$ = this._cards$.asObservable();

  startHandlingOfMyDeckActions(takeUntil: MonoTypeOperatorFunction<Game>): void {
    this.cardDialUpdates$.pipe(
      map(this.animateGetCardFromDeck),
    ).subscribe(this.gameIterationService.registerTask);
  }

  private animateGetCardFromDeck = (update: Game): Observable<any> => {
    return of(update).pipe(
      map(this.toCardDialData),
      tap(this.appendCard),
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

  private appendCard = ({ cardId }: CardDialData) => {
    // console.log(cardId);
    this._cards$.next([...this._cards$.value, cardId]);
  };

  private startCardMovingAnimation = (
    { cardId, deckId }: CardDialData,
  ) => this.cardMoveOverlayService.startCardMoving({
    cardId: cardId,
    from: deckId,
  });
}
