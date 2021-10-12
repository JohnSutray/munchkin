import { GeneratorActionHandler } from 'apps/api/src/app/actions/generator-action-handler';


export interface DoorBreakPayload {
  readonly playerId: string;
}

export const doorBreakActionHandler: GeneratorActionHandler<DoorBreakPayload> = game => [

];
