import { MutatorActionHandler } from 'apps/api/src/app/actions/mutator-action-handler';
import { GeneratorActionHandler } from 'apps/api/src/app/actions/generator-action-handler';
import { ActionTypeEnum } from 'libs/api-interfaces/src/lib/enums/action-type.enum';


export const mutatorActionHandlers: { [key: string]: MutatorActionHandler } = {};

export const generatorActionHandlers: { [key: string]: GeneratorActionHandler } = {};

export const getActionType = (actionName: string): ActionTypeEnum => {
  if (Object.keys(mutatorActionHandlers).includes(actionName)) {
    return ActionTypeEnum.MUTATOR;
  }

  if (Object.keys(generatorActionHandlers)) {
    return ActionTypeEnum.GENERATOR;
  }

  throw new Error(`Unknown action type ${actionName}`);
};

export const registerMutationActionHandler = (
  key: string, handler: MutatorActionHandler,
) => {
  console.log(`register mutator action: ${key}`);
  return mutatorActionHandlers[key] = handler;
};

export const registerGeneratorActionHandler = (
  key: string, handler: GeneratorActionHandler,
) => {
  console.log(`register generator action: ${key}`);
  return generatorActionHandlers[key] = handler;
};
