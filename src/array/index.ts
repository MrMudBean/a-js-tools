import { intersection } from './intersection';
import { union } from './union';
import { difference } from './difference';
import { symmetricDifference } from './symmetricDifference';

export { union, intersection, difference, symmetricDifference };
/**
 * ## 数组的一些方法
 *
 * - `union` 两个数组的并集（排除共有项）
 * - `intersection` 两个数组的交集（共有项）
 * - `difference` 两个数组的差集 （A - B）
 * - `symmetricDifference`  对称差集 （ A △ B）
 */
export const enArr = {
  /**
   * ### 数组的并集
   *  <span style="color:#f36;">请注意，参数有不为数组时直接抛出 TypeError</span>
   * @param arrays  - 多个数组
   * @returns 联合后的数组
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
   */
  union,
  /**
   * ### 两个数组的交集
   *
   * @param a 数组 1️⃣
   * @param b 数组 2️⃣
   * @returns 返回两个数组的交集
   * @example
   * ```ts
   * import { intersection } from 'a-js-tools';
   *
   * const log = console.log;
   *
   * log(intersection([1, 2, 3, 4], [2, 3])); // [2, 3]
   * log(intersection([1, 3, 5, 7], [2, 3, 4])); // [3]
   * ```
   */
  intersection,
  /**
   * ### 求给出的两个数组的差值（A - B）
   *
   * @param a  - 第一个数组
   * @param b - 第二个数组
   * @throws {TypeError} 当两个参数有一个不是
   * @description 当两个参数有一个不是数组时将抛出
   * @returns 返回第一个参数相对第二个参数的差值
   * @example
   * ```ts
   * import { difference} from 'a-js-tools';
   *
   * const log = console.log;
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
   */
  difference,

  /**
   * ### 对称差集 （ A △ B）
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
  symmetricDifference,
};
