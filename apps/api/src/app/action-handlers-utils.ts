import { MutatorActionHandler } from 'apps/api/src/app/actions/models/mutator-action-handler';
import { GeneratorActionHandler } from 'apps/api/src/app/actions/models/generator-action-handler';
import { ActionTypeEnum } from 'libs/api-interfaces/src/lib/enums/action-type.enum';
import { generatorActionHandlers, mutatorActionHandlers } from 'apps/api/src/app/action-handlers';

export const getMutatorActionHandler = (handlerName: string): MutatorActionHandler => {
  const handler = mutatorActionHandlers[handlerName];

  if (!handler) {
    throw new Error(`${handlerName} mutator is not registered!`);
  }

  return handler;
};
export const getGeneratorActionHandler = (handlerName: string): GeneratorActionHandler => {
  const handler = generatorActionHandlers[handlerName];

  if (!handler) {
    throw new Error(`${handlerName} mutator is not registered!`);
  }

  return handler;
};
export const getActionType = (actionName: string): ActionTypeEnum => {
  if (Object.keys(mutatorActionHandlers).includes(actionName)) {
    return ActionTypeEnum.MUTATOR;
  }

  if (Object.keys(generatorActionHandlers)) {
    return ActionTypeEnum.GENERATOR;
  }

  throw new Error(`Unknown action type ${actionName}`);
};
