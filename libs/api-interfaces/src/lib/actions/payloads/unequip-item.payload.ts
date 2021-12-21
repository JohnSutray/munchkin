export interface UnequipItemPayload {
  readonly playerId: string;
  readonly itemId: string;
  readonly newIndexInDeck: number;
}
