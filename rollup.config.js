import typescript from "rollup-plugin-typescript2";
import bundleSize from "rollup-plugin-bundle-size";
import { terser } from "rollup-plugin-terser";

const cutFunctionNames = () => ({
  name: "cut-function-names",
  transform(code) {
    const newCode = code
      .replace(/handleFallback/g, "h")
      .replace(/arrToPath/g, "a")
      .replace(/fallback/g, "f")
      .replace(/obj/g, "o")
      .replace(/path/g, "p");
    return newCode;
  }
});

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

    plugins: [typescript(), terser(), bundleSize(), cutFunctionNames()]
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

    plugins: [typescript(), terser(), bundleSize(), cutFunctionNames()]
  }
];
