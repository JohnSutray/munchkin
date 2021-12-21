import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';


export const setBrokenDoorActionHandler: MutatorActionHandler = game => ({
  ...game,
  currentBrokenDoor: game.doors[0],
  doors: game.doors.slice(1),
});
