import { dev } from '@qqi/dev';
import { getRandomInt } from '../index';

dev('测试获取随机数', () => {
  for (let i = 100; --i; ) {
    console.log(getRandomInt(12, 10));
  }
});
