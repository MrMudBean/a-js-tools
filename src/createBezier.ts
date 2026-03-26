/**
 * @module @a-js-tools/createBezier
 * @file createBezier.ts
 * @description 生成贝尔赛曲线
 * @author Mr.MudBean <Mr.MudBean@outlook.com>
 * @copyright 2026 ©️ Mr.MudBean
 * @since 2026-03-26 11:24
 * @version 2.0.2
 * @lastModified 2026-03-26 14:12
 *
 * ## [贝尔赛曲线](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Reference/Values/easing-function#%E4%B8%89%E6%AC%A1%E8%B4%9D%E5%A1%9E%E5%B0%94%E7%BC%93%E5%8A%A8%E5%87%BD%E6%95%B0)
 *
 * 一种通过控制点生成光滑曲线的数学参数曲线，是平滑插值曲线。
 *
 * 广泛应用于计算机图像学、字体设计、动画游戏开发、工业设计和医学图像处理。
 *
 * 常见的贝尔赛曲线类型有二次和三次，其中三次贝尔赛曲线使用最多。曲线具有端点插值、凸包性。
 *
 */

/**
 * ## 在 JS 中模拟 CSS cubic-bezier(p1x, p1y, p2x, p2y)
 *
 * @param p1x - 第一个控制点 X
 * @param p1y - 第一个控制点 Y
 * @param p2x - 第二个控制点 X
 * @param p2y - 第二个控制点 Y
 * @returns 一个接收时间 t (0-1) 返回进度值 (0-1 或超出) 的函数
 * @example
 * ```ts
 * // --- 使用示例 ---
 *
 * // 1. 定义一个类似 CSS 'ease-in-out' 的曲线: cubic-bezier(0.42, 0, 0.58, 1)
 * const myEaseInOut = createBezier(0.42, 0, 0.58, 1);
 *
 * // 2. 定义一个带回弹效果的曲线: cubic-bezier(0.68, -0.55, 0.27, 1.55)
 * const myElastic = createBezier(0.68, -0.55, 0.27, 1.55);
 *
 * // 3. 在 JS 动画循环中使用
 * let startTime = null;
 * const duration = 1000; // 1秒
 * const element = document.getElementById('box');
 *
 * function animate(timestamp) {
 *   if (!startTime) startTime = timestamp;
 *   const elapsed = timestamp - startTime;
 *
 *   // 计算归一化时间 (0 到 1)
 *   let rawTime = Math.min(elapsed / duration, 1);
 *
 *   // 【关键点】将线性时间 rawTime 传入贝塞尔函数，得到非线性进度
 *   const progress = myElastic(rawTime);
 *
 *   // 应用进度 (例如移动距离)
 *   const distance = 300 * progress;
 *   element.style.transform = `translateX(${distance}px)`;
 *
 *   if (elapsed < duration) {
 *     requestAnimationFrame(animate);
 *   }
 * }
 *
 * requestAnimationFrame(animate);
 * ```
 */
export function createBezier(
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number,
) {
  // 三次贝塞尔曲线公式: B(t) = (1-t)^3 * P0 + 3(1-t)^2*t * P1 + 3(1-t)*t^2 * P2 + t^3 * P3
  // 这里 P0=(0,0), P3=(1,1)

  const cx = 3 * p1x;
  const bx = 3 * (p2x - p1x) - cx;
  const ax = 1 - cx - bx;

  const cy = 3 * p1y;
  const by = 3 * (p2y - p1y) - cy;
  const ay = 1 - cy - by;

  // 计算给定 t 的 x 值
  /**
   * @param t
   */
  function sampleCurveX(t: number): number {
    return ((ax * t + bx) * t + cx) * t;
  }

  /**
   * ### 计算给定 t 的 y 值
   * @param t 时间进度
   */
  function sampleCurveY(t: number): number {
    return ((ay * t + by) * t + cy) * t;
  }

  /**
   * ### 核心难点：已知 x (时间)，求 t。因为 x(t) 是单调的，可以用牛顿迭代法求解
   * @param x 时间进度
   */
  function getTForX(x: number): number {
    let t0, t1, t2, x2, d2;

    // 初始猜测
    t2 = x;

    // 牛顿迭代法 (通常 8 次足够精确)
    for (let i = 0; i < 8; i++) {
      x2 = sampleCurveX(t2) - x;
      if (Math.abs(x2) < 1e-6) return t2;

      d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
      if (Math.abs(d2) < 1e-6) break;

      t2 = t2 - x2 / d2;
    }

    // 如果牛顿法失败，退化为二分法
    t0 = 0;
    t1 = 1;
    t2 = x;

    while (t0 < t1) {
      x2 = sampleCurveX(t2);
      if (Math.abs(x2 - x) < 1e-6) return t2;
      if (x > x2) t0 = t2;
      else t1 = t2;
      t2 = (t1 - t0) * 0.5 + t0;
    }
    return t2;
  }

  // 返回最终的计算函数
  return function (t: number): number {
    // 边界处理：CSS 允许 t < 0 或 t > 1 (产生回弹效果)
    if (t <= 0) return sampleCurveY(0);
    if (t >= 1) return sampleCurveY(1);

    const realT = getTForX(t);
    return sampleCurveY(realT);
  };
}
