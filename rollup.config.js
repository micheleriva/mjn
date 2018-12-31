import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "./main.ts",

    output: [
      {
        file: "dist/main.esm.js",
        format: "esm",
        name: "dist/main.esm.js"
      }
    ],

    watch: {
      exclude: ["node_modules/**"]
    },

    plugins: [typescript(), terser()]
  },
  {
    input: "./main.ts",

    output: [
      {
        file: "dist/main.js",
        format: "umd",
        name: "dist/main.js"
      }
    ],

    watch: {
      exclude: ["node_modules/**"]
    },

    plugins: [typescript(), terser()]
  }
];
