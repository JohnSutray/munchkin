import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DndLinksService } from 'apps/munchkin/src/app/services/dnd-links.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { CardPlaceholderService } from 'apps/munchkin/src/app/services/card-placeholder.service';
import { MyDeckService } from 'apps/munchkin/src/app/services/my-deck.service';
import { SubscribingComponent } from 'apps/munchkin/src/app/common/subscribing.component';
import { myDeckId } from 'apps/munchkin/src/app/constants/workspace.constants';

export interface CardDropData {
  readonly cardId: string;
  readonly source: string;
}

@Component({
  selector: 'munchkin-my-deck',
  templateUrl: './my-deck.component.html',
  styleUrls: ['./my-deck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyDeckComponent extends SubscribingComponent implements OnInit {
  readonly dndPointName = DndLinksService.myDeckPoint;
  readonly linkedDndPoints = this.dndLinksService.linkedDndPoints;
  readonly cards = this.myDeckService.cards$;

  constructor(
    private readonly dndLinksService: DndLinksService,
    private readonly cardPlaceholderService: CardPlaceholderService,
    private readonly myDeckService: MyDeckService,
  ) {
    super();
  }

  trackByValue(index: number, value: string): string {
    return value;
  }

  getDropData(cardId: string): CardDropData {
    return { cardId, source: myDeckId };
  }

  ngOnInit(): void {
    this.myDeckService.startHandlingOfMyDeckActions(this.takeUntilDestroy);
  }

  processDrop(
    {
      item: { data: { source } }, previousIndex, currentIndex,
    }: CdkDragDrop<CardDropData, CardDropData, CardDropData>,
  ) {
    if (source === myDeckId) {
      const cardsAfterReplacements = [...this.myDeckService.cards];

      moveItemInArray(cardsAfterReplacements, previousIndex, currentIndex);

      this.myDeckService.setCards(cardsAfterReplacements);
    }
  }
}
