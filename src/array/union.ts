import { isArray, isEmptyArray } from 'a-type-of-js';

/**
 *
 * 数组的并集
 *
 *  <span style="color:#f36;">请注意，参数有不为数组时直接抛出 TypeError</span>
 * @param arrays  - 多个数组
 * @returns 联合后的数组
 *
 *
 * @example
 *
 * ```ts
 * import { union } from 'a-js-tools';
 *
 * const log = console.log;
 *
 * // []
 * log(union());
 *
 * // [1, 2, 3]
 * log(union([1, 2, 3]));
 *
 * //  TypeError
 * log(union([1, 2, 3], 'i'));
 * log(union([1, 2, 3], undefined));
 * log(union([1, 2, 3], null));
 * log(union([1, 2, 3], 4));
 * log(union([1, 2, 3], {}));
 * log(union([1, 2, 3], false));
 *
 * // [1, 2, 3, 4, 6]
 * log(union([1, 2, 3], [2, 4, 6]));
 *
 * // [1, 2, 3, 4, 6]
 * log(union([1, 2, 3], [2, 4, 6], [1, 2, 3]));
 *
 * // [1, 2, 3, 4, 6]
 * log(union([1, 2, 3], [2, 4, 6], [1, 2, 3], [1, 2, 3]));
 * ```
 *
 */
export function union<T>(...arrays: T[][]): T[] {
  if (isEmptyArray(arrays)) {
    return [];
  }
  if (arrays.some(i => !isArray(i))) {
    throw new TypeError('参数必须都是数组形式的元素');
  }
  if (arrays.length === 1) {
    return [...arrays[0]];
  }

  const resultSet = new Set<T>();

  for (const array of arrays) {
    for (const item of array) {
      resultSet.add(item);
    }
  }

  return Array.from(resultSet);
}
