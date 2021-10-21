import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MyDeckService {
  private readonly _cards$ = new BehaviorSubject<string[]>(['1', '2', '3', '4', '5']);

  readonly cards$ = this._cards$.asObservable();

  setCards(cards: string[]): void {
    this._cards$.next(cards);
  }
}
