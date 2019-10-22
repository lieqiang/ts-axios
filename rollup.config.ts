import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2' // 编译typescript
import json from 'rollup-plugin-json'

const pkg = require('./package.json')

const libraryName = 'index'// 'ts-axios'

export default {
  input: `src/${libraryName}.ts`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true }, // pkg.module 输出文件名， package.json里面的module配置
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [], // 声明一些外部依赖，不打进包里面如 loadash
  watch: { // 监听文件变化，重新运行编译打包程序，编译的时候开启 --watch 才生效
    include: 'src/**',
  },
  plugins: [ // 编译所需的一些插件
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }), // 使用 tsconfig.json里面的 declarationDir 配置
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
}
