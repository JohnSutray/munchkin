import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { myDeckId } from 'apps/munchkin/src/app/constants/workspace.constants';
import { ActionService } from 'apps/munchkin/src/app/services/action.service';
import { Observable } from 'rxjs';
import { CardDropData } from 'apps/munchkin/src/app/models/card-drop-data.model';
import { DndDrop } from 'apps/munchkin/src/app/models/dnd.model';
import { map } from 'rxjs/operators';
import { EItem, getItemType } from 'libs/api-interfaces/src/lib/cards/cards-collection';
import { DndLinksService } from 'apps/munchkin/src/app/services/dnd-links.service';
import { filterNotNull } from 'apps/munchkin/src/app/utils/angular.utils';
import { MyDeckService } from 'apps/munchkin/src/app/services/my-deck.service';

@Component({
  selector: 'munchkin-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EquipmentItemComponent {
  readonly linkedDndPoints$ = this.dndLinksService.linkedDndPoints$;

  @Input() equipmentType: EItem;
  @Input() item$: Observable<string>;

  get dropData$(): Observable<CardDropData> {
    return this.item$.pipe(
      filterNotNull(),
      map(this.toDropData),
    );
  }

  constructor(
    private readonly actionService: ActionService,
    private readonly dndLinksService: DndLinksService,
    private readonly myDeckService: MyDeckService,
  ) {
  }

  handleDrop(
    { item: { data: { source, cardId } } }: DndDrop<CardDropData>,
  ) {
    if (source === myDeckId) {
      this.myDeckService.removeCardLocally(cardId);
      this.actionService.equipCard(cardId);
    }

    if (source === this.equipmentType) {
      // TODO: implement moving of items of same type(e.g. weapons)
    }
  }

  private toDropData(cardId: string): CardDropData {
    return {
      cardId,
      source: getItemType(cardId),
    };
  }
}
