import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { delay, filter, switchMap } from 'rxjs/operators';
import { merge, Observable, of } from 'rxjs';
import { CardMoveOverlayService } from 'apps/munchkin/src/app/services/card-move-overlay.service';
import { CardMovingTask } from 'apps/munchkin/src/app/models/card-moving-task.model';
import { SubscribingComponent } from 'apps/munchkin/src/app/common/subscribing.component';
import { cardMoveTransitionTime } from 'apps/munchkin/src/app/constants/animation.constants';

interface MoveAnimation {
  readonly transform: string;
  readonly transition: string;
}

@Directive({
  selector: '[munchkinCardMove]',
})
export class CardMoveDirective extends SubscribingComponent implements OnInit {
  private readonly smoothTransition = `transform ${cardMoveTransitionTime}ms cubic-bezier(0, 0, 0.2, 1)`;

  @Input() cardId: string;

  constructor(
    private readonly cardMoveOverlayService: CardMoveOverlayService,
    private readonly elementRef: ElementRef<HTMLElement>,
  ) {
    super();
  }

  ngOnInit(): void {
    this.cardMoveOverlayService.task$.pipe(
      this.takeUntilDestroy,
      filter<CardMovingTask>(task => task.cardId === this.cardId),
      switchMap(this.createTwoTranslationStates.bind(this)),
    ).subscribe(this.applyAnimation);
  }

  private applyAnimation = (animation: MoveAnimation): void => {
    const { nativeElement: { style } } = this.elementRef;

    style.transform = animation.transform;
    style.transition = animation.transition;
  };

  private createStartMovingAnimation(fromId: string): MoveAnimation {
    return {
      transform: this.elementPositionToTranslation(fromId),
      transition: '',
    };
  }

  private createEndAnimation(): MoveAnimation {
    return {
      transform: this.endElementPositionToTranslation(),
      transition: this.smoothTransition,
    };
  }

  private createUnsetAnimation(): MoveAnimation {
    return {
      transform: '',
      transition: '',
    };
  }

  private createTwoTranslationStates(task: CardMovingTask): Observable<MoveAnimation> {
    return merge(
      of(this.createStartMovingAnimation(task.from)),
      of(this.createEndAnimation()).pipe(delay(10)),
      of(this.createUnsetAnimation()).pipe(delay(cardMoveTransitionTime)),
    );
  };

  private elementPositionToTranslation = (elementId: string): string => {
    const { x, y } = document.getElementById(elementId).getBoundingClientRect();
    const { x: myX, y: myY } = this.elementRef.nativeElement.getBoundingClientRect();

    return `translate3d(${x - myX}px,${y - myY}px,0)`;
  };

  private endElementPositionToTranslation = (): string => {
    return `translate3d(0,0,0)`;
  };
}
