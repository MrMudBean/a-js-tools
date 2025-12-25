import { isNull, isString } from 'a-type-of-js';
import { autoEscapedRegExpOptions } from './types';

/**
 *
 * 解析 options
 *
 */
export function parse(
  options: string | autoEscapedRegExpOptions,
): autoEscapedRegExpOptions {
  // 处理 options
  if (isString(options)) {
    options = {
      flags: options,
    };
  }

  // 处理 flags
  if (!isString(options.flags)) options.flags = '';
  else {
    // 需求是保留字符串中的某一部分，使用
    const regexp = /[migsuy]/g;
    const matchResult = options.flags.match(regexp);
    if (isNull(matchResult)) options.flags = '';
    else options.flags = [...new Set(matchResult)].join('');
  }

  return options;
}
