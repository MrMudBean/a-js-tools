import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import { external } from '@qqi/rollup-external';

export default {
  input: 'eg/index.ts',
  output: {
    format: 'es',
    entryFileNames: '[name].mjs',
    preserveModules: false,
    sourcemap: false,
    exports: 'named',
    dir: '.eg/',
  },
  // 配置需要排除的包
  external: external({
    ignore: ['node:'],
    include: ['eg/index.ts'],
  }),
  plugins: [resolve(), commonjs(), json(), typescript({}), cleanup()],
};
