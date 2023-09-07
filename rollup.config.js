import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import static_files from 'rollup-plugin-static-files';
import terser from '@rollup/plugin-terser';
import image from '@rollup/plugin-image';
import rebase from 'rollup-plugin-rebase';

export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/bundle.js",
      format: "esm",
      sourceMap: true
    },
    {
      file: "dist/bundle.min.js",
      format: "esm",
      plugins: [terser()]
    }
  ],
  plugins: [
    postcss({
      extensions: [".css"],
    }),
    image(),
    static_files({
      include: ['./public']
    }),
    nodeResolve({
      extensions: [".js"],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    babel({
      presets: ["@babel/preset-react"],
    }),
    commonjs(),
    serve({
      open: false,
      verbose: true,
      contentBase: ["", "public"],
      host: "localhost",
      port: 3000
    }),
    livereload({ watch: "dist" })
  ]
}
