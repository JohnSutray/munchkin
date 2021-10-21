import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CardPlaceholderService {
  private readonly _placeholderCard = new BehaviorSubject('');

  readonly placeholderCard = this._placeholderCard.asObservable();

  setPlaceholderCard(cardId: string): void {
    this._placeholderCard.next(cardId);
  }
}
