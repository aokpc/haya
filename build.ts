// JSXをバンドルするためのスクリプト
import * as esbuild from "npm:esbuild";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";
import { fileURLToPath } from "node:url"

try {
  Deno.mkdirSync(fileURLToPath(import.meta.resolve("./page/dist/")))
} catch (_) {
}

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: [import.meta.resolve("./src/index.tsx")],
  outfile: "./page/dist/index.js",
  bundle: true,
  format: "iife",
});

await esbuild.build({
  plugins: [...denoPlugins()],
  entryPoints: [import.meta.resolve("./src/admin.tsx")],
  outfile: "./page/dist/admin.js",
  bundle: true,
  format: "iife",
});

esbuild.stop();