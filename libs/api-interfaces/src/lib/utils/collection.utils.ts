import { isMatch } from 'lodash-es';

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

export const insertItem = <T>(list: T[], item: T, atIndex: number): T[] => {
  const newList = [...list];

  newList.splice(atIndex, 0, item);

  return newList;
};
