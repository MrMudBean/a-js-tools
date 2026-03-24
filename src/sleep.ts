import { isZero } from 'a-type-of-js';

/**
 * ## 线程休息
 *
 * 但从调用到执行完毕总是与期望的时间并不相吻合，除非执行是线型的（也不保证时间的严格性）
 *
 * - 宏任务：整体代码、setTimeout、DOM 事件回调、requestAnimationFrame、setImmediate、setInterval、I/O操作、UI渲染等
 * - 微任务：Promise的then/catch/finally、process.nextTick（Node.js）、MutationObserver、queueMicrotask（显示添加微任务）等
 *
 * <span style="color:#ff0;">*Node.js中的process.nextTick优先级高于其他微任务*</span>
 *
 * @param delay 睡觉时长（机器时间，毫秒为单位）
 * @returns 🈳
 * @example
 *
 * ```ts
 * import { sleep } from 'a-js-tools';
 *
 * console.log(Date.now()); // 1748058118471
 * await sleep(1000);
 * console.log(Date.now()); // 1748058119473
 * ```
 */
export async function sleep(delay: number = 1000): Promise<void> {
  if (!isFinite(delay) || delay < 4)
    throw new TypeError('delay 应该是一个正常的数值');
  if (isZero(delay)) return Promise.resolve();

  return new Promise(resolve => setTimeout(resolve, delay));
}
