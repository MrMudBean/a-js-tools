import { isArray, isEmptyArray } from 'a-type-of-js';

/**
 *
 * 两个数组的交集
 *
 * @param a 数组 1️⃣
 * @param b 数组 2️⃣
 * @returns 返回两个数组的交集
 * @example
 *
 * ```ts
 * import { intersection } from 'a-js-tools';
 *
 * const log = console.log;
 *
 *
 * log(intersection([1, 2, 3, 4], [2, 3])); // [2, 3]
 * log(intersection([1, 3, 5, 7], [2, 3, 4])); // [3]
 *
 * ```
 *
 */
export function intersection<T>(a: T[], b: T[]): T[] {
  if (!isArray(a) || !isArray(b)) {
    throw new TypeError('参数必须是数组类型数据');
  }
  // 任意数组为空，则返回空数组
  if (isEmptyArray(a) || isEmptyArray(b)) {
    return [];
  }
  /**
   * 在实际运算中， new Set() 的 开销为 O(n) ,filter 的开销也为 O(n)
   *
   * 但是以较短的数组创建 Set ，可以节省内存开销
   */
  const [shorter, longer] = a.length <= b.length ? [a, b] : [b, a];
  // 提前创建工具 Set
  const shortSet = new Set(shorter);
  return longer.filter(item => shortSet.has(item));
}
