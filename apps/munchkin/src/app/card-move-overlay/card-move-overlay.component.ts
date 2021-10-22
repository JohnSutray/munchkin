import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { CardMoveOverlayService } from 'apps/munchkin/src/app/services/card-move-overlay.service';
import { SubscribingComponent } from 'apps/munchkin/src/app/common/subscribing.component';
import { CardMovingTask } from 'apps/munchkin/src/app/models/card-moving-task.model';
import { delay, map, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, merge, Observable, of, Subject, timer } from 'rxjs';

@Component({
  selector: 'munchkin-card-move-overlay',
  templateUrl: './card-move-overlay.component.html',
  styleUrls: ['./card-move-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardMoveOverlayComponent extends SubscribingComponent {
  private readonly smoothTransitionTime = 350;
  private readonly smoothTransition = `transform ${this.smoothTransitionTime}ms cubic-bezier(0, 0, 0.2, 1)`;

  readonly cardId = this.cardMoveOverlayService.task$.pipe(
    map(task => task.cardId)
  );
  readonly translate = this.cardMoveOverlayService.task$.pipe(
    switchMap(this.createTwoTranslationStates.bind(this)),
  );
  readonly transition = new Subject<string>();
  readonly display = new BehaviorSubject('none');

  constructor(
    private readonly cardMoveOverlayService: CardMoveOverlayService,
  ) {
    super();
  }

  private createTwoTranslationStates(task: CardMovingTask): Observable<string> {
    return merge(
      of(this.elementPositionToTranslation(task.from)).pipe(
        tap(this.unsetSmoothTransition),
        tap(this.showCard)
      ),
      // of(this.elementPositionToTranslation(task.to)).pipe(
      //   delay(1),
      //   tap(this.setSmoothTransition),
      //   tap(this.hideCardAfterTransitionEnd)
      // ),
    );
  };

  private elementPositionToTranslation = (elementId: string): string => {
    const { x, y } = document.getElementById(elementId).getBoundingClientRect();

    return `translate3d(${x}px,${y}px,0)`;
  }

  private hideCardAfterTransitionEnd = () => timer(this.smoothTransitionTime).subscribe(this.hideCard);

  private setSmoothTransition = (): void => this.transition.next(this.smoothTransition);

  private unsetSmoothTransition = (): void => this.transition.next('');

  private hideCard = (): void => this.display.next('none');

  private showCard = (): void => this.display.next('')
}
