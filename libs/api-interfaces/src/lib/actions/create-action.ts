import { v4 } from 'uuid';
import { GameAction } from 'libs/api-interfaces/src/lib/models/action';

export const createAction = <TPayload = object>(name: string, payload?: TPayload): GameAction<TPayload> => ({
  id: v4(),
  name,
  payload,
});
