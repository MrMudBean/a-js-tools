import { isArray, isEmptyArray } from 'a-type-of-js';

/**
 *  求给出的两个数组的差值（A - B）
 *
 * @param a  - 第一个数组
 * @param b - 第二个数组
 * @throws {TypeError} 当两个参数有一个不是
 * @description 当两个参数有一个不是数组时将抛出
 * @returns 返回第一个参数相对第二个参数的差值
 * @example
 *
 * ```ts
 * import { difference} from 'a-js-tools';
 *
 * const log = console.log;
 *
 *
 * log(difference([], [1, 2, 3])); // []
 *
 * log([1, 2, 3], []); //[1, 2, 3]
 *
 * log([1, 2, 3, 4, 5, 6, 7], [1, 2, 3, 4, 5]); //[6, 7]
 *
 * // 将抛出 TypeError
 * log(difference([1, 2, 3], 'a'));
 * log(difference([1, 2, 3], 1));
 * log(difference([1, 2, 3], undefined));
 * log(difference([1, 2, 3], null));
 * log(difference([1, 2, 3],  true));
 * ```
 *
 */
export function difference<T>(a: T[], b: T[]): T[] {
  if (!isArray(a) || !isArray(b)) {
    throw new TypeError('参数需为数组');
  }
  if (isEmptyArray(a) || isEmptyArray(b)) {
    return a;
  }
  /**  获取两个数组中长度较小的  */
  // 参数有顺序要求
  // const [shorter, longer] = a.length > b.length ? [b, a] : [a, b];
  // const shorterSet = new Set(shorter);
  const bSet = new Set(b);

  return a.filter(i => !bSet.has(i));
}
