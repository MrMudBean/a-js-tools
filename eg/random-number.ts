import { dev } from '@qqi/dev';
import { getRandomInt, getRandomString } from '../index';
import { _p } from 'a-node-tools';

dev.skip('测试获取随机数', () => {
  for (let i = 100; --i; ) {
    console.log(getRandomInt(12, 10));
  }
});

dev('测试随机的字符串获取', () => {
  for (let i = 100; i--; ) {
    _p(
      getRandomString({
        length: 12,
        includeNumbers: true,
        includeSpecial: true,
        includeUppercaseLetters: true,
      }),
    );
  }
});
