/**
 * # 将一个字符串转化为符合正则要求的字符串
 *
 * @param str 需要转义的字符串
 * @requires escapeRegExp 转化后字符串
 * @example
 * ```ts
 * import { escapeRegExp  } from 'a-js-tools';
 *
 * escapeRegExp('a.b.c'); // 'a\\.b\\.c'
 * escapeRegExp('a\\.b\\.c'); // 'a\\\\.b\\\\.c'
 * escapeRegExp('[a-z]'); // '\\[a-z\\]'
 * escapeRegExp('^abc$'); // '\\^abc\\$'
 * ```
 */
export function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
