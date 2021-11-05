import { Component, Input, OnInit } from '@angular/core';
import { equipmentId } from 'apps/munchkin/src/app/constants/workspace.constants';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { CardDropData } from 'apps/munchkin/src/app/my-deck/my-deck.component';
import { ActionService } from 'apps/munchkin/src/app/services/action.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'munchkin-equipment-item',
  templateUrl: './equipment-item.component.html',
  styleUrls: ['./equipment-item.component.scss'],
})
export class EquipmentItemComponent implements OnInit {
  readonly equipmentId = equipmentId;


  @Input() item$: Observable<string>;

  constructor(
    private readonly actionService: ActionService,
  ) {
  }

  ngOnInit(): void {
  }

  handleDrop(
    { item: { data: { source, cardId } } }: CdkDragDrop<CardDropData, CardDropData, CardDropData>,
  ) {
    this.actionService.equipCard(cardId);
  }
}
