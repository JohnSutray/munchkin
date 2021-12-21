export interface Player {
  readonly id: string;
  readonly name: string;
  readonly cards: string[];
  readonly level: number;
  readonly races: string[];
  readonly classes: string[];
  readonly lastDiceValue: number;

  readonly items: string[];
}
