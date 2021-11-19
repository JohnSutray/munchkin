import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DndLinksService } from 'apps/munchkin/src/app/services/dnd-links.service';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { CardPlaceholderService } from 'apps/munchkin/src/app/services/card-placeholder.service';
import { MyDeckService } from 'apps/munchkin/src/app/services/my-deck.service';
import { SubscribingComponent } from 'apps/munchkin/src/app/common/subscribing.component';
import { myDeckId } from 'apps/munchkin/src/app/constants/workspace.constants';
import { logTap } from 'apps/munchkin/src/app/utils/angular.utils';
import { DndDrop } from 'apps/munchkin/src/app/models/dnd.model';
import { CardDropData } from 'apps/munchkin/src/app/models/card-drop-data.model';
import { isItemType } from 'libs/api-interfaces/src/lib/cards/cards-collection';
import { ActionService } from 'apps/munchkin/src/app/services/action.service';
import { insertItem } from 'libs/api-interfaces/src/lib/utils/collection.utils';
import { EquipmentService } from 'apps/munchkin/src/app/services/equipment.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'munchkin-my-deck',
  templateUrl: './my-deck.component.html',
  styleUrls: ['./my-deck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyDeckComponent extends SubscribingComponent implements OnInit {
  readonly dndPointName = myDeckId;
  readonly linkedDndPoints$ = this.dndLinksService.linkedDndPoints$;
  readonly cards$ = this.myDeckService.cards$.pipe(tap(c => console.log(c.length)));

  constructor(
    private readonly dndLinksService: DndLinksService,
    private readonly cardPlaceholderService: CardPlaceholderService,
    private readonly myDeckService: MyDeckService,
    private readonly actionService: ActionService,
    private readonly equipmentService: EquipmentService,
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
    this.myDeckService.observeCards(this.takeUntilDestroy);
  }

  processDrop(
    {
      item: { data: { source, cardId } }, previousIndex, currentIndex,
    }: DndDrop<CardDropData>,
  ) {
    if (source === myDeckId) {
      this.setLocalCardOrder(previousIndex, currentIndex);
      this.actionService.moveCard(cardId, currentIndex);
    }
    if (isItemType(source)) {
      this.insertCardLocally(cardId, currentIndex);
      this.equipmentService.removeItemLocally(cardId);
      this.actionService.unequipCard(cardId, currentIndex);
    }
  }

  private insertCardLocally(cardId: string, atIndex: number): void {
    this.myDeckService.setCards(
      insertItem(this.myDeckService.cards, cardId, atIndex),
    );
  }

  private setLocalCardOrder(previousIndex: number, currentIndex: number): void {
    const cardsAfterReplacements = [...this.myDeckService.cards];

    moveItemInArray(cardsAfterReplacements, previousIndex, currentIndex);

    this.myDeckService.setCards(cardsAfterReplacements);
  }
}
