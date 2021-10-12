export interface GameAction<TPayload = any> {
  readonly id: string;
  readonly name: string;
  readonly payload?: TPayload;
}
