/**
 *
 * 构建构建的构建函数
 *
 *
 */
export interface CreateConstructor<T, Args extends unknown[] = unknown[]> {
  new (...args: Args): T;
}
/**
 *
 * 构建一个 Constructor 构造函数
 *
 * 接收一个构造函数，然后返回 TS 能识别的构造函数自身
 *
 * 函数本身并没有执行任何逻辑，仅是简单的返回了实参自身
 *
 * 而经过该函数的包装，构造函数成了能够被 TS 识别为可用 new 实例的构造函数
 *
 * @param constructor - 传入一个构造函数
 * @returns 返回传入的构造函数
 *
 * ```ts
 * import { createConstructor } from "a-js-tools";
 *
 * type Tom = {
 *   a: number
 * }
 *
 * function _Tom (this: TomType): Tom {
 *    this.a = 1;
 *
 *    return this;
 * }
 *
 * // 逻辑上没有错，但是会造成 ts 显示
 * // 其目标缺少构造签名的 "new" 表达式隐式具有 "any" 类型。ts(7009)
 * const a = new _Tom();
 *
 * const tomConstructor = createConstructor(_tom);
 *
 * const b = new tomConstructor(); // 这时就不会显示错误
 *
 * ```
 *
 */
export function createConstructor<T, Args extends unknown[] = unknown[]>(
  constructor: (...argumentList: Args) => T,
): CreateConstructor<T, Args> {
  constructor.prototype.apply = Function.apply;
  constructor.prototype.bind = Function.bind;
  constructor.prototype.call = Function.call;
  constructor.prototype.length = Function.length;
  constructor.prototype.arguments = Function.arguments;
  constructor.prototype.name = Function.name;
  constructor.prototype.toString = Function.toString;

  return constructor as unknown as CreateConstructor<T, Args>;
}
