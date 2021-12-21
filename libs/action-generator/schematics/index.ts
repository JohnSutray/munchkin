import { Tree, convertNxGenerator } from '@nrwl/devkit';

export function sourceActionGenerator(_tree: Tree, opts: any) {
  console.log('options', opts);
}

export const actionGenerator = convertNxGenerator(sourceActionGenerator);
