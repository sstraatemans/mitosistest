const path = require('path');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel').default;
const dtsPlugin = require('rollup-plugin-dts').default;
const typescript = require('rollup-plugin-ts');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const json = require('@rollup/plugin-json');
const { vanillaExtractPlugin } = require('@vanilla-extract/rollup-plugin');

module.exports = (options) => {
  const {
    dir,
    packageJson,
    plugins = [],
    external = [],
    dts = true,
    compilerOptions = {},
    babelPresets = [],
    babelPlugins = [],
    disableCoreCompilation = false
  } = options;

  const tsconfig = require(path.resolve(__dirname, './tsconfig.json'));
  tsconfig.compilerOptions = { ...tsconfig.compilerOptions, ...compilerOptions };

  const defaultPresets = ['@babel/preset-env', ['@babel/preset-typescript', tsconfig.compilerOptions]];

  const inputs = [
    disableCoreCompilation
      ? null
      : {
          input: options.input || path.resolve(dir, 'src/index.ts'),
          output: [
            {
              file: packageJson.main,
              format: 'cjs',
              sourcemap: true,
              inlineDynamicImports: true
            },
            {
              file: packageJson.module,
              format: 'esm',
              sourcemap: true,
              inlineDynamicImports: true
            }
          ],
          treeshake: true,
          external,
          plugins: [
            ...plugins,
            new vanillaExtractPlugin(),

            resolve.nodeResolve({ extensions: ['.js', '.ts', '.tsx'] }),
            json(),
            typescript({ tsconfig: { ...tsconfig.compilerOptions, emitDeclarationOnly: true } }),
            babel({
              plugins: [['@babel/plugin-proposal-decorators', { legacy: true }, ...babelPlugins]],
              extensions: ['.js', '.ts', '.tsx'],
              presets: babelPresets.length > 0 ? [...babelPresets, ...defaultPresets] : defaultPresets,
              babelHelpers: 'bundled',
              ignore: [/node_modules/]
            }),
            peerDepsExternal(),
            commonjs()
          ]
        },
    dts && !disableCoreCompilation
      ? {
          input: path.resolve(dir, packageJson.module.replace('.js', '.d.ts')),
          output: [{ file: path.resolve(dir, 'dist/index.d.ts'), format: 'esm' }],
          plugins: [dtsPlugin()]
        }
      : null
  ];

  return inputs.filter((x) => x);
};
