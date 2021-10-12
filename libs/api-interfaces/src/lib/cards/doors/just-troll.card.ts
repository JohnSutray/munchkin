import { Monster } from 'libs/api-interfaces/src/lib/models/monster';
import { registerDoor } from 'libs/api-interfaces/src/lib/cards/cards-collection';

export const justTrollDoor: Monster = {
  id: 'just-troll-monster',
};

registerDoor(justTrollDoor);
