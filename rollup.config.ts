import fs from 'fs';
import path from 'path';

import { RollupOptions } from 'rollup';
import typescriptPlugin from '@rollup/plugin-typescript';
import cleaner from 'rollup-plugin-cleaner';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import acornJsx from 'acorn-jsx';
import postcss from 'rollup-plugin-postcss';
import postcssNested from 'postcss-nested';
import postcssCustomMedia from 'postcss-custom-media';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import postcssSimpleVars from 'postcss-simple-vars';

const componentsPath = './src/components/';
const components = fs.readdirSync(path.resolve(__dirname, componentsPath));

const getCssExtractor = (filePath: string, componentPath: string) => postcss({
  plugins: [
    postcssNested,
    postcssCustomMedia,
    postcssImport,
    postcssMixins,
    postcssSimpleVars,
  ],
  modules: {
    generateScopedName: '[hash:5]',
  },
  autoModules: false,
  extract:     filePath,
  include:     componentPath,
});

const componentsEntries = components.reduce((memo, name) => {
  // eslint-disable-next-line no-param-reassign
  memo[`components/${name}/index`] = `${componentsPath}${name}/index.tsx`;

  return memo;
}, {} as Record<string, string>);

const cssExtractors = components.map(name => getCssExtractor(
  `components/${name}/index.css`,
  `${componentsPath}${name}/**/*`,
));

const GLOBAL_STYLE_PATH = './src/styles/base.css';

cssExtractors.push(getCssExtractor(
  'styles/base.css',
  GLOBAL_STYLE_PATH,
));

const config = (): RollupOptions => ({
  input: {
    'utils/index': './src/utils/index.ts',
    ...componentsEntries,
    'styles/base': GLOBAL_STYLE_PATH,
  },
  output: {
    dir:          './build',
    format:       'esm',
    sourcemap:    true,
    manualChunks: {
      'utils/index': ['./src/utils/index.ts'],
    },
  },
  external: [
    'react',
    'react/jsx-runtime',
    'classnames',
  ],
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  acornInjectPlugins: [acornJsx()],
  plugins:            [
    cleaner({ targets: ['./build'] }),
    commonjs(),
    nodeResolve(),
    typescriptPlugin({
      tsconfig: 'tsconfig.prod.json',
      include:  ['src/**/*'],
    }),
    ...cssExtractors,
    copy({
      targets: [
        { src: './src/styles/fonts/', dest: './build/styles/' },
      ],
    }),
  ],
});

export default config;
