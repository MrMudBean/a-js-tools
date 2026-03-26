import {
  getDirectoryBy,
  pathJoin,
  readFileToJsonSync,
  writeJsonFileSync,
  fileExist,
} from 'a-node-tools';
import { readdirSync } from 'node:fs';
import { basename, extname } from 'node:path';

// 原始 package.json 内容
let packageJson = readFileToJsonSync('./package.json');
// 移除冗余的键
['scripts', 'devDependencies', 'lint-staged', 'private'].forEach(
  key => delete packageJson[key],
);
const esPrefix = 'es'; // es 前缀
const cjsPrefix = 'cjs'; // cjs 前缀
const dtsPrefix = 'es/types'; // 类型文件的前缀
// 查看当前打包 dist 文件路径
const distParentPath = getDirectoryBy('dist', 'directory');
// 查看当前的源码文件路径（原则上与上面值一致）
const srcParentDirectory = getDirectoryBy('src', 'directory');
// 当前 src 的路径
const srcDirectory = pathJoin(srcParentDirectory, 'src');
// src 目录下的文件列表
const srcChildrenList = readdirSync(srcDirectory);
// 打包的 exports
const exportsList = {};
const files = ['LICENSE', 'README.md'];

for (const childrenName of srcChildrenList) {
  // 如果是测试文件则跳过
  if (
    // 剔除测试文件
    childrenName.endsWith('.test.ts') ||
    // 剔除非导出模块
    ['testData.ts', 'types.ts'].includes(childrenName)
  )
    continue;

  // 文件名（不带后缀）
  const childrenBaseName = basename(childrenName, extname(childrenName));
  // 子文件/夹的路径
  const childPath = pathJoin(srcDirectory, childrenName);

  const childFile = fileExist(childPath); // 文件元数据
  // 剔除主文件（主文件不添加到根导出但是需要添加到导出文件列表）
  if (childrenName.endsWith('index.ts')) {
    files.push('index.cjs.js', 'index.es.js', 'index.d.ts');
    continue;
  }
  if (!childFile) throw new RangeError(`${childrenName} 文件未能读取`);
  // 子文件是文件夹时以 index.xxx.js 为准
  if (childFile.isDirectory()) {
    files.push(childrenName);
    exportsList[`./${childrenBaseName}`] = {
      default: `./${childrenName}/index.es.js`,
      import: `./${childrenName}/index.es.js`,
      require: `./${childrenName}/index.cjs.js`,
      types: `./${childrenName}/index.d.ts`,
    };
  } else if (childFile.isFile()) {
    files.push(
      `${childrenBaseName}.cjs.js`,
      `${childrenBaseName}.d.ts`,
      `${childrenBaseName}.es.js`,
    );
    exportsList[`./${childrenBaseName}`] = {
      default: `./${childrenBaseName}.es.js`,
      import: `./${childrenBaseName}.es.js`,
      require: `./${childrenBaseName}.cjs.js`,
      types: `./${childrenBaseName}.d.ts`,
    };
  } else {
    throw new Range(`${childrenName} 文件类型不符合要求`);
  }
}

packageJson = {
  ...packageJson,
  main: cjsPrefix + '/index.js', // 旧版本 CommonJs 入口
  module: esPrefix + '/index.js', // 旧版本 ESM 入口
  // unpkg: '', // 如果希望通过 CDN 使用，可以添加 unpkg 字段指向 UMD 构建版本
  // funding: '', // 如果有人赞助，可以添加
  types: dtsPrefix + '/index.d.ts', // 旧版本类型入口
  author: {
    name: '泥豆君',
    email: 'Mr.MudBean@outlook.com',
    url: 'https://lmssee.com',
  },
  description: '一点点 🤏  js 函数',
  sideEffects: false, // 核心：开启 Tree Shaking
  engines: {
    // globalThis 支持的最低版本的 node 为 12
    node: '>=18.0.0',
  },
  files,
  exports: {
    '.': {
      import: `./index.es.js`,
      default: `./index.es.js`,
      require: `./index.es.js`,
      types: `./index.d.ts`,
    },
    ...exportsList,
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/MrMudBean/a-js-tools.git',
  },
  keywords: ['a-js-tools', 'js 工具'],
  homepage: 'https://lmssee.com/npm/a-js-tools',
  bugs: {
    url: 'https://github.com/MrMudBean/a-js-tools/issues',
    email: 'Mr.MudBean@outlook.com',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },

  browserslist: ['last 2 versions not ie <= 11'],
};

{
  // 整理打包后 package.json 文件路径
  const distPackagePath = pathJoin(distParentPath, './dist/package.json');
  // 写入新的 packages.json 文件
  writeJsonFileSync(distPackagePath, packageJson);
}
