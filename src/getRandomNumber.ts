/**
 * 过去随机数
 *
 * @packageDocumentation
 * @module @a-js-tools/get-random-number
 * @license MIT
 */
import { isNaN, isNumber } from 'a-type-of-js';

/**
 *
 * 获取一个随机的整数类型
 *
 * 您可以传入两个参数并获取它们之间的任意数字，返回值<span style="color:#ff0;">*会包含端值*</span>
 *
 * 如果只传递一个参数，则如果提供的值为负数，则得到一个小于（或大于）该数字的整数
 *
 * @param   max 较大值 ，不允许为`NaN`
 * @param   min 较小值，不允许为 `NaN`
 * @returns  任意的整数
 */
export function getRandomInt(max: number = 1, min: number = 0): number {
  //  判断是否为 NaN 或 不是数字
  if (
    !isFinite(max) ||
    !isFinite(min) ||
    isNaN(max) ||
    isNaN(min) ||
    !isNumber(max) ||
    !isNumber(min)
  ) {
    throw new TypeError('getRandomInt: max or min is NaN or is not a number');
  }

  /**  获取最小值  */
  let _min = Math.ceil(Number(min)),
    /**  获取最大值  */
    _max = Math.floor(Number(max));
  //  两值相等时，直接返回最大值
  if (_max === _min) return _max;
  //  两值交换
  if (_min > _max) [_max, _min] = [_min, _max];

  return Math.round(Math.random() * (_max - _min) + _min);
}

/**
 *
 * 获取任意的浮点数
 *
 * 您可以传入两个参数并获取它们之间的任意数字
 *
 * 如果只传入一个参数，则如果提供的值为负数，则获取小于（或大于）该数字的浮点数
 *
 * @param   max 较大数，缺省值为 1
 * @param min 较小值，缺省值为 0
 * @returns  任意的浮点数
 */
export function getRandomFloat(max: number = 1, min: number = 0): number {
  //  判断是否为 NaN 或 不是数字
  if (
    !isFinite(max) ||
    !isFinite(min) ||
    isNaN(max) ||
    isNaN(min) ||
    !isNumber(max) ||
    !isNumber(min)
  ) {
    throw new TypeError('getRandomInt: max or min is NaN or is not a number');
  }
  if (max == min) max++;
  if (min > max) [max, min] = [min, max];
  return Math.random() * (max - min) + min;
}
