import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';

const production = !process.env.ROLLUP_WATCH

export default {
  /**
   * This is needed to hide a warning that rollup gives to client side libraries. The warning is apparently not 
   * something to worry about, but there is also no "proper" way of making it go away. The curreent suggested 
   * solution is to hide the warning with a custom 'onwarn' function.
   * 
   * Github links that mention the issue:
   * - https://github.com/rollup/rollup/issues/4699
   * - https://github.com/TanStack/query/issues/5175
   */
  onwarn(warning, warn) {
    if (
      warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
      warning.message.includes(`'use client'`)
    ) {
      return
    }
    warn(warning)
  },
  input: "src/index.js",
  output: [
    {
      file: "dist/bundle.js",
      format: "cjs",
      sourceMap: true
    }
  ],
  plugins: [
    postcss({
      extensions: [".css"],
    }),
    image(),
    nodeResolve({
      extensions: [".js"],
      browser: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.BUILD || 'development')
    }),
    babel({
      exclude: 'node_modules/**',
      presets: [
        ["@babel/preset-react", {
          "runtime": "automatic"
        }]
      ],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    !production && serve({
      open: false,
      verbose: true,
      contentBase: ["", "public"],
      historyApiFallback: true,
      host: "127.0.0.1",
      port: 3000
    }),
    !production && livereload({ watch: "dist" })
  ]
}
