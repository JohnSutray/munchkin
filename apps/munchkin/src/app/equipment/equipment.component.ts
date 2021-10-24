import { Component, OnInit } from '@angular/core';
import { equipmentId } from 'apps/munchkin/src/app/constants/workspace.constants';

@Component({
  selector: 'munchkin-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  readonly equipmentId = equipmentId;

  constructor() { }

  ngOnInit(): void {
  }

}
