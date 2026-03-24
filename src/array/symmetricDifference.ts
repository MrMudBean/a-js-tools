import { isArray, isEmptyArray } from 'a-type-of-js';
import { difference } from './difference';

/**
 * ## 对称差集 （ A △ B）
 *
 * @param a  - 数组 a
 * @param b  - 数组 b
 * @returns - 返回一个全新的数组
 * @example
 * ```ts
 * import { symmetricDifference } from 'a-js-tools';
 *
 * const log = console.log;
 *
 * log(symmetricDifference([1, 2], [2, 3])); // [1, 3]
 *
 * log(symmetricDifference([1, 2, 3], [1, 2, 4])); // [3, 4]
 *
 * log(symmetricDifference([1, 2, 3], [1, 2, 3])); // []
 *
 * /// TypeError
 * log(symmetricDifference(1, []));
 * log(symmetricDifference(undefined, []));
 * log(symmetricDifference(null, []));
 * log(symmetricDifference('a', []));
 * log(symmetricDifference(true, []));
 * ```
 */
export function symmetricDifference<T>(a: T[], b: T[]): T[] {
  if (!isArray(a) || !isArray(b)) {
    throw new TypeError('参数必须是数组');
  }

  if (isEmptyArray(a)) {
    return [...b];
  }

  if (isEmptyArray(b)) {
    return [...a];
  }

  return [...difference(a, b), ...difference(b, a)];
}
