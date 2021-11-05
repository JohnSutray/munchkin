import { Component, OnInit } from '@angular/core';
import { EquipmentService } from 'apps/munchkin/src/app/services/equipment.service';

@Component({
  selector: 'munchkin-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent implements OnInit {
  readonly headId$ = this.equipmentService.headId$;
  readonly bodyId$ = this.equipmentService.bodyId$;
  readonly bootsId$ = this.equipmentService.bootsId$;

  readonly leftHandId$ = this.equipmentService.leftHandId$;
  readonly rightHandId$ = this.equipmentService.rightHandId$;

  constructor(
    private readonly equipmentService: EquipmentService,
  ) {
  }

  ngOnInit(): void {
  }

}
