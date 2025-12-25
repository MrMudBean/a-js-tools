import { isString, isUndefined } from 'a-type-of-js';
import { escapeRegExp } from './escapeRegExp';
import { autoEscapedRegExpOptions } from './types';
import { parse } from './parse';

/**
 *
 * ##  适用于简单的文本字符串自动转化为简单模式正则表达式
 *
 * *若字符串包含且需保留字符类、组、反向引用、量词等时，该方法可能不适用*
 *
 * @param pattern 待转化的文本字符串
 * @param options 转化选项。 为文本字符串时，默认为正则表达式的标志，还可指定是否匹配开头或结尾
 * @returns 正则表达式
 * @example
 *
 * ```ts
 * import { autoEscapedRegExp } from 'a-regexp';
 *
 * autoEscapedRegExp('abc'); // => /abc/
 * autoEscapedRegExp('abc', 'gim'); // => /abc/gim
 * autoEscapedRegExp('abc',  { flags: 'g', start: true }); // => /^abc/g
 * autoEscapedRegExp('abc',  { flags: 'g', end: true }); // => /abc$/g
 * autoEscapedRegExp('abc',  { start: true, end: true }); // => /^abc$/
 *
 * // 转化特殊字符类、组、反向引用、量词等
 * // 无法保留匹配规则
 * autoEscapedRegExp('a-zA-Z0-9'); // => /a-zA-Z0-9/
 * autoEscapedRegExp('a-zA-Z0-9', 'g'); // => /a-zA-Z0-9/g
 * autoEscapedRegExp('[a-zA-Z0-9]'); // => /\[a-zA-Z0-9\]/
 * autoEscapedRegExp('^[a-zA-Z0-9]+$'); // => /\^\[a-zA-Z0-9\]\$/
 *
 * ```
 *
 */
export function autoEscapedRegExp(
  pattern: string,
  options?: string | autoEscapedRegExpOptions,
): RegExp {
  if (!isString(pattern)) throw new TypeError('pattern must be a 字符串');
  pattern = escapeRegExp(pattern);
  /** 简单转化  */
  if (isUndefined(options)) return new RegExp(pattern);
  options = parse(options);
  return new RegExp(
    `${options.start ? '^' : ''}${pattern}${options.end ? '$' : ''}`,
    options.flags,
  );
}
