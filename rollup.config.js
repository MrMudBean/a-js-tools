import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import { external } from '@qqi/rollup-external';

const formatEs = 'es';
const formatCjs = 'cjs';
const formatUmd = 'umd';

/**
 * ## 构建打包
 *
 */
function createConfig({ format, dir = undefined, transform = false }) {
  return {
    input: './src/index.ts',
    output: Object.fromEntries(
      [
        ['format', format], // 打包模式
        ['dir', dir ?? `dist/${format}`], // 打包的目录
        ['preserveModules', true], // 是否保留源码目录结构
        ['preserveModulesRoot', 'src'], // 是否保持 src 目录结构（当前模式下貌似没有作用）
        ['sourcemap', false], // 打包关闭 source map
        ['exports', 'named'], // 导出模式
        format === formatUmd && ['name', 'aJsTools'], // 在 umd 模式下设定全局变量名
      ].filter(Boolean),
    ),
    plugins: [
      resolve(),
      commonjs(),
      json(),
      typescript({}),
      // 去除无用代码
      transform && cleanup(),
      copy({
        targets: [
          { src: 'README.md', dest: 'dist' },
          { src: 'LICENSE', dest: 'dist' },
        ],
      }),
    ].filter(Boolean),
    external: external(), // 排除 dependencies 依赖
  };
}

export default [
  createConfig({
    format: formatEs,
  }),
  createConfig({
    format: formatCjs,
  }),
  // createConfig({
  //   format: formatUmd,
  //   transform: true,
  // }),
];
