import { isMatch } from 'lodash';

export const replace = <T>(
  items: T[],
  predicate: ((t: T) => boolean) | Partial<T>,
  replacer: (t: T) => T,
): T[] => {
  const matcher = typeof predicate === 'function'
    ? predicate
    : item => isMatch(item, predicate);

  return items.map(item => matcher(item) ? replacer(item) : item);
};

export const without = <T>(items: T[], item: T): T[] => items.filter(i => i !== item);

export const last = <T>(items: T[]): T => items[items.length - 1];
