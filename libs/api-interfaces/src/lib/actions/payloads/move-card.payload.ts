export interface MoveCardPayload {
  readonly playerId: string;
  readonly itemId: string;
  readonly newIndex: number;
}
