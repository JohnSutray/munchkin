import { Component } from '@angular/core';
import {
  doorsDropId,
  doorsId,
  treasuresDropId,
  treasuresId,
} from 'apps/munchkin/src/app/constants/workspace.constants';

@Component({
  selector: 'munchkin-card-packs',
  templateUrl: './card-packs.component.html',
  styleUrls: ['./card-packs.component.scss']
})
export class CardPacksComponent {
  readonly doors = doorsId;
  readonly doorsDrop = doorsDropId;
  readonly treasures = treasuresId;
  readonly treasuresDrop = treasuresDropId;
}
