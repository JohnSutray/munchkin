import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'apps/munchkin/src/app/services/equipment.service';
import { EItem } from 'libs/api-interfaces/src/lib/cards/cards-collection';
import { SubscribingComponent } from 'apps/munchkin/src/app/common/subscribing.component';

@Component({
  selector: 'munchkin-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent extends SubscribingComponent implements OnInit {
  readonly headId$ = this.equipmentService.headId$;
  readonly bodyId$ = this.equipmentService.bodyId$;
  readonly bootsId$ = this.equipmentService.bootsId$;
  readonly leftHandId$ = this.equipmentService.leftHandId$;
  readonly rightHandId$ = this.equipmentService.rightHandId$;

  readonly EItem = EItem;

  constructor(
    private readonly equipmentService: EquipmentService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.equipmentService.startItemsObserve(this.takeUntilDestroy);
  }
}
