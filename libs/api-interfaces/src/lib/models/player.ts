export interface Player {
  readonly id: string;
  readonly cards: string[];
  readonly level: number;
  readonly races: string[];
  readonly classes: string[];
  readonly lastDiceValue: number;
  // readonly head?: string;
  // readonly boots?: string;
  // readonly body?: string;
  // readonly firstHand?: string;
  // readonly secondHand?: string;
  readonly items: string[];
}
