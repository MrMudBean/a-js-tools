/**
 * 驼峰命名与连字符命名法的互换
 *
 * @packageDocumentation
 * @module @a-js-tools/class-name
 * @license MIT
 */
/**
 *
 * 连字符连接转化为小/大驼峰命名法
 *
 * @param str    待转化文本
 * @param dividingType   连字符，缺省值为 "-"
 * @param initial 是否转换第一个字符。默认值为 false （小驼峰类型）
 * @returns 驼峰命名法字符串（e.g. “helloWorld”）
 *
 */
export function toLowerCamelCase(
  /**  待转化文本  */
  str: string,
  /**  连字符，缺省值为 "-"  */
  dividingType: string = '-',
  /** 是否转换第一个字符。默认值为 false （小驼峰类型） */
  initial: boolean = false,
): string {
  let result: string = str;
  /**
   * 匹配规则
   *
   * - 匹配到分隔符，将分隔符后面的字符转化为大写
   */
  const template =
    /[\\]|[\^]|[?]|[-]|[.]|[(]|[)]|[|]|[[]\[\]]|[{]|[}]|[+]|[*]|[$]/;
  /**  转化首字符   */
  const toTransform = (_str: string, _dividingType: string) =>
    _str.replace(
      new RegExp(
        `${template.test(_dividingType) ? `\\${_dividingType}` : _dividingType}([a-zA-Z])`,
        'g',
      ),
      (match: string, p1: string) => p1.toUpperCase(),
    );
  // 多分隔符转化
  dividingType
    .split('')
    .forEach((item: string) => (result = toTransform(result, item)));

  return initial
    ? result.replace(/^./, (match: string) => match.toUpperCase())
    : result;
}

/**
 * 驼峰命名法转化为连字符连接
 *
 * @param str          待转化文本
 * @param dividingType       分割符
 * @returns 分割符转化的文本 (e.g. 'hello-world')
 *
 */
export function toSplitCase(str: string, dividingType: string = '-'): string {
  const result: string = str.replace(/[A-Z]/g, (match: string) =>
    dividingType.concat(match.toLowerCase()),
  );
  return result.startsWith(dividingType) ? result.substring(1) : result;
}
