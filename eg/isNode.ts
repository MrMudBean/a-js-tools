import { isUndefined } from 'a-type-of-js';
import { dev } from '@qqi/dev';

dev('测试是否是 node 环境', it => {
  it('测试报错将返回错误', () => {
    console.log('====================================');
    console.log(isUndefined(globalThis.window));
    console.log('====================================');
  });
  it('测试正确的值返回 true', () => {
    console.log('====================================');
    console.log(typeof window === 'undefined');
    console.log('====================================');
  });
});
