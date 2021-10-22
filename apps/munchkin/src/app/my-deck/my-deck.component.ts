import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DndLinksService } from 'apps/munchkin/src/app/services/dnd-links.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CardPlaceholderService } from 'apps/munchkin/src/app/services/card-placeholder.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MyDeckService } from 'apps/munchkin/src/app/services/my-deck.service';
import { SubscribingComponent } from 'apps/munchkin/src/app/common/subscribing.component';

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

  getCardVisibility(cardId: string): Observable<string> {
    return this.cardPlaceholderService.placeholderCard.pipe(
      map(placeholderId => this.toVisibility(placeholderId, cardId))
    )
  }

  toVisibility(placeholderId: string, cardId: string): string {
    return placeholderId === cardId
      ? 'hidden'
      : 'visible';
  }

  trackByValue(index: number, value: string): string {
    return value;
  }

  drop(drop: CdkDragDrop<string>) {
    console.log(this.cards);
  }

  ngOnInit(): void {
    this.myDeckService.startHandlingOfMyDeckActions(this.takeUntilDestroy);
  }
}
