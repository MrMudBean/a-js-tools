import {
  getDirectoryBy,
  pathJoin,
  readFileToJsonSync,
  writeJsonFile,
} from 'a-node-tools';
let packageJson = readFileToJsonSync('./package.json');

['scripts', 'devDependencies', 'lint-staged', 'private'].forEach(
  e => delete packageJson[e],
);

packageJson = {
  ...packageJson,
  main: 'index.cjs',
  module: 'index.mjs',
  types: 'index.d.ts',
  files: ['index.mjs', 'index.cjs', 'index.d.ts', 'src'],
  exports: {
    import: './index.mjs',
    require: './index.cjs',
    types: './index.d.ts',
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/earthnutDev/a-js-tools.git',
  },
  keywords: ['a-js-tools', 'earthnut'],
  author: {
    name: '花生亻',
    email: 'earthnut.dev@outlook.com',
    url: 'https://earthnut.dev/about',
  },
  homepage: 'https://earthnut.dev/npm/a-js-tools',
  bugs: {
    url: 'https://github.com/earthnutDev/a-js-tools/issues',
    email: 'earthnut.dev@outlook.com',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
  engines: {
    // globalThis 支持的最低版本的 node 为 12
    node: '>=15.0.0',
  },
  browserslist: ['last 2 versions not ie <= 11'],
};

{
  const distPath = getDirectoryBy('dist', 'directory');

  const distPackagePath = pathJoin(distPath, './dist/package.json');

  writeJsonFile(distPackagePath, packageJson);
}
