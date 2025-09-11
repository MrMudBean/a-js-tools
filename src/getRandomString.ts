/**
 * 获取随机字符串
 *
 * @packageDocumentation
 * @module @a-js-tools/get-random-string
 * @license MIT
 */
import { isNaN, isNumber, isPlainObject, isUndefined } from 'a-type-of-js';
import { ObjectAssign } from './object/createConstructor';
/**
 *
 *  随机字符串 生成器
 *
 */
export type RandomStringOptions = {
  /**
   * 字符串长度
   *
   * @default 32
   */
  length?: number;
  /**
   *  字符集
   * @default '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
   */
  chars?: string;
  /**
   *  是否包含数字
   *
   * @default false
   */
  includeNumbers?: boolean;
  /**
   *  是否包含大写字母
   *
   * @default false
   */
  includeUppercaseLetters?: boolean;
  /**
   * 是否包含特殊字符
   *
   * @default false
   */
  includeSpecial?: boolean;
  /**
   * 字符类型
   *
   * 缺省值为 'string'，可选为 'uuid'
   *
   * @default 'string''
   */
  type?: 'string' | 'uuid';
};

/**
 *
 *  获取简单的随机字符串
 *
 *  @param   options - 字符串长度
 *  @returns  - 随机字符串
 *
 *
 */
export function getRandomString(
  options?: RandomStringOptions | number,
): string {
  //   验证输入参数
  if (
    // 参数类型错误
    (!isPlainObject(options) && !isNumber(options)) ||
    // 参数为 NaN
    (isNumber(options) && isNaN(options)) ||
    // 参数为数字时为无穷大
    (isNumber(options) && !isFinite(options)) ||
    // 参数为数字时为非整数
    (isNumber(options) && !Number.isInteger(options)) ||
    // 参数为数字时为负数
    (isNumber(options) && Number.isInteger(options) && options < 1) ||
    // 参数为数值然而却小于 1
    (isNumber(options) && options < 1) ||
    // 参数为对象但是 length 属性非数值
    (isPlainObject(options) &&
      (!isNumber(options.length) ||
        options.length < 1 ||
        !Number.isInteger(options.length)))
  )
    throw new TypeError('参数类型错误 ❌ (getRandomString)');

  const initOptions: RandomStringOptions & {
    length: number;
    chars: string;
    chars2: string;
    chars3: string;
  } = {
    length: 32,
    chars: 'abcdefghijklmnopqrstuvwxyz',
    chars2: '0123456789',
    chars3: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
    type: 'string',
    includeUppercaseLetters: false,
    includeNumbers: false,
    includeSpecial: false,
  };

  /// 生成 UUID
  if (initOptions.type === 'uuid') return crypto.randomUUID();
  // 验证输入参数
  if (isNumber(options) && Number.isInteger(options) && options > 0)
    ObjectAssign(initOptions, { length: options });
  if (isPlainObject(options)) {
    ObjectAssign(initOptions, options);
    initOptions.length = initOptions.length < 1 ? 32 : initOptions.length;
  }
  /**  生成随机字符串  */
  const templateCharsArr: string[] = initOptions.chars.split('');
  // 添加大写字母
  if (initOptions.includeUppercaseLetters)
    interleaveString(templateCharsArr, initOptions.chars.toUpperCase());
  // 添加数字
  if (initOptions.includeNumbers)
    interleaveString(templateCharsArr, initOptions.chars2);
  // 添加特殊字符
  if (initOptions.includeSpecial)
    interleaveString(templateCharsArr, initOptions.chars3);

  // 使用密码学安全的随机数生成器
  const bytes = globalThis.crypto.getRandomValues(
    new Uint8Array(initOptions.length),
  );
  let result = '';
  /**  获取最后的 chars 数据  */
  const chars = templateCharsArr.join('');

  // 循环遍历
  bytes.forEach(byte => (result += chars.charAt(byte % chars.length)));

  /**
   *
   *  字符串交叉函数
   *
   *  非线形串交叉，对相交叉
   *
   *  @param  str1 - 字符串1
   *  @param  str2 - 字符串2
   *  @returns - 交叉后的字符串
   *  @example
   *  ```ts
   *  interleaveString('abc', '123') // 'a1b2c3'
   *  ```
   */
  function interleaveString(str1: string[], str2: string) {
    const str1Length = str1.length,
      str2Length = str2.length;
    const maxLength = Math.max(str1Length, str2Length);

    for (let i = 0; i < maxLength; i++) {
      if (i < str1Length && !isUndefined(str2[i])) str1[i] += str2[i];
      else if (i < str2Length) str1[i] = str2[i];
    }
  }
  return result;
}
