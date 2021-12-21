import { Component, Input } from '@angular/core';

@Component({
  selector: 'munchkin-card-stack',
  templateUrl: './card-stack.component.html',
  styleUrls: ['./card-stack.component.scss'],
})
export class CardStackComponent {
  @Input() stackId: string;
  @Input() cardShiftSize = 3;
  @Input() topCardId: string;
  @Input() topCardShirtMode: boolean;
  @Input() connectedDrops: string[];

  @Input() set stackSize(size: number) {
    this.iterator = Array(size).fill(0);
  };

  iterator = [];
}
