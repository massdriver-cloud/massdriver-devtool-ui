import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import gzipPlugin from 'rollup-plugin-gzip';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';

const production = process.env.BUILD = 'production'

export default {
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
    gzipPlugin(),
    nodeResolve({
      extensions: [".js"],
      browser: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
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
