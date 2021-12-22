import { Tree } from '@nrwl/devkit';
import { glob } from 'glob';
import { readFileSync } from 'fs';

interface ActionHandlerSchema {
  readonly importPath: string;
  readonly exportedHandler: string;
  readonly actionName: string;
  readonly generator: boolean;
  readonly mutator: boolean;
}

interface NewActionSchema {
  readonly actionName: string;
  readonly type: string;
  readonly folder: string;
  readonly onlyUpdate: boolean;
}

const actionsFolder = 'apps/api/src/app/actions';

const findAlreadyDeclaredSchemes = (tree: Tree) => {
  const files = glob.sync(`${tree.root}/${actionsFolder}/**/*.ts`)
    .filter(name => ![
      'action-handlers.ts',
      'action-handlers-utils.ts',
    ].some(excluded => name.includes(excluded)));

  return files.map(filename => {
    const file = readFileSync(filename).toString().split('\n');

    const exportStringWithExportWord = file.find(line =>
      line.includes('export const') &&
      (line.includes('GeneratorActionHandler') || line.includes('MutatorActionHandler')),
    );

    if (!exportStringWithExportWord) {
      return null;
    }

    const exportString = exportStringWithExportWord.replace('export const ', '');
    const exportedHandler = exportString.slice(0, exportString.indexOf(':'));
    const actionName = exportedHandler.replace('ActionHandler', 'Action');
    const generator = exportString.includes('GeneratorActionHandler');
    const mutator = exportString.includes('MutatorActionHandler');

    return ({
      importPath: filename.slice(filename.indexOf('apps')).replace('.ts', ''),
      exportedHandler,
      actionName,
      generator,
      mutator,
    });
  }).filter(Boolean);
};

const updateActionHandlersRegistration = (
  actionHandlerSchemas: ActionHandlerSchema[],
  tree: Tree,
) => {
  const actionHandlersContent = [
    'import { MutatorActionHandler } from \'apps/api/src/app/actions/models/mutator-action-handler\';',
    'import { GeneratorActionHandler } from \'apps/api/src/app/actions/models/generator-action-handler\';',
    'import { GameActions } from \'libs/api-interfaces/src/lib/actions\';',

    ...actionHandlerSchemas.map(s =>
      `import { ${s.exportedHandler} } from '${s.importPath}'`,
    ),

    '',

    'export const mutatorActionHandlers: { [key: string]: MutatorActionHandler } = {',
    ...actionHandlerSchemas.filter(s => s.mutator).map(s =>
      `  [GameActions.${s.actionName}]: ${s.exportedHandler},`,
    ),
    '};',

    '',

    'export const generatorActionHandlers: { [key: string]: GeneratorActionHandler } = {',
    ...actionHandlerSchemas.filter(s => s.generator).map(s =>
      `  [GameActions.${s.actionName}]: ${s.exportedHandler},`,
    ),
    '};',
  ].join('\n');

  tree.write('apps/api/src/app/action-handlers.ts', actionHandlersContent);
};

const generateNewActionHandler = (
  tree: Tree,
  { actionName, type, folder }: NewActionSchema
) => {
  const newSchema = {
    generator: type === 'g',
    mutator: type === 'm',
    actionName,
    importPath: ``,
  };

  const importOfActionType = newSchema.mutator
    ? 'import { MutatorActionHandler } from \'apps/api/src/app/actions/models/mutator-action-handler\';'
    : 'import { GeneratorActionHandler } from \'apps/api/src/app/actions/models/generator-action-handler\';';

  const actionType = newSchema.mutator
    ? 'MutatorActionHandler'
    : 'GeneratorActionHandler';

  const generatorDefaultFunction = '(game, payload) => []';
  const mutatorDefaultFunction = '(game, payload) => ({ ...game })';

  const actionFunction = newSchema.generator ? generatorDefaultFunction : mutatorDefaultFunction;

  tree.write(
    `${actionsFolder}/${folder}/${actionName}.action-handler.ts`,
    [
      importOfActionType,
      `export const ${actionName}ActionHandler: ${actionType} = ${actionFunction};`,
    ].join('\n'),
  );
}

const updateActions = (
  alreadyDeclaredSchemes: ActionHandlerSchema[],
  tree: Tree,
) => {
  const actionsFileContent = [
    'export enum GameActions {',
    ...alreadyDeclaredSchemes.map(schema =>
      `  ${schema.actionName} = '${schema.actionName}',`,
    ),
    '}',
  ].join('\n');

  tree.write('libs/api-interfaces/src/lib/actions/index.ts', actionsFileContent);
};

export default async function (tree: Tree, schema: NewActionSchema) {
  const oldDeclaredSchemes = findAlreadyDeclaredSchemes(tree);

  const actionAlreadyExists = oldDeclaredSchemes.some(s => s.actionName === schema.actionName);

  if (!actionAlreadyExists && !schema.onlyUpdate) {
    generateNewActionHandler(tree, schema);
  }

  const declaredSchemes = findAlreadyDeclaredSchemes(tree);
  updateActions(declaredSchemes, tree);
  updateActionHandlersRegistration(declaredSchemes, tree);
}
