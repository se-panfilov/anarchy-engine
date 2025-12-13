// We need vite only for preload.ts, cause in the current version of electron it could be  CommonJS module only (no ESM)
// And hardly support imports (or node modules such as path, fs, etc.).
// So the recommended way is to use a bundler for preload.ts.

import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
const tsconfigPath: string = resolve(__dirname, 'tsconfig.preload.json');

export default defineConfig({
  plugins: [tsconfigPaths({ projects: [tsconfigPath] })],
  build: {
    outDir: 'dist',
    emptyOutDir: false, // Do not empty outDir, we build electron-main.ts first there
    lib: {
      entry: './preload.ts',
      formats: ['cjs'], //prebuild.ts must be CommonJs module in the current electron version (otherwise we can get rid of Vite here)
      fileName: (): string => 'preload.js'
    },
    rollupOptions: {
      external: ['electron'], // Prevent bundling electron module
      output: {
        exports: 'named'
      }
    }
  }
});
