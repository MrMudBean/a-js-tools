import { isUndefined } from 'a-type-of-js';

/**
 *
 * 判断当前环境是否为 node 环境
 *
 */
export function isNode(): boolean {
  return !isUndefined(
    (globalThis &&
      globalThis.process &&
      globalThis.process.versions &&
      globalThis.process.versions.node) ||
      undefined,
  );
}

/**
 *
 * 是否为浏览器环境
 *
 */
export function isBrowser(): boolean {
  return !isNode();
}
