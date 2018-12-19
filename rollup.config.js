import typescript from "rollup-plugin-typescript";
import { uglify } from "rollup-plugin-uglify";

export default [
  {
    input: "./main.ts",

    output: {
      name: "dist",
      format: "umd",
      file: "dist.js",
      dir: "./dist"
    },

    watch: {
      exclude: ["node_modules/**"]
    },

    plugins: [typescript(), uglify()]
  }
];
