import { Treasure } from 'libs/api-interfaces/src/lib/models/treasure';
import { Door } from 'libs/api-interfaces/src/lib/models/door';

export const doorsCollection: Door[] = [];
export const treasuresCollection: Treasure[] = [];

export const registerDoor = (door: Door) => doorsCollection.push(door);
export const registerTreasure = (treasure: Treasure) => treasuresCollection.push(treasure);
