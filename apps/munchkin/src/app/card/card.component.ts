import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ECardType, getCardType } from 'libs/api-interfaces/src/lib/cards/cards-collection';

@Component({
  selector: 'munchkin-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @HostBinding('attr.id')
  @Input() cardId: string;

  @Input() shirtMode: boolean;

  get shirtImage(): string {
    return getCardType(this.cardId) === ECardType.TREASURE
      ? 'assets/icons/treasure.png'
      : 'assets/icons/door.png';
  }

  @HostBinding('class.card-wrapper')
  private readonly cardWrapperClass = true;
}
