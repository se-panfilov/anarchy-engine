import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
const tsconfigPath: string = resolve(__dirname, 'tsconfig.preload.json');

// We need vite for preload.ts, when we want to use imports.
// In the current version of electron, preload.ts can be CommonJS only (not ESM).
// And it hardly supports imports (and node modules such as path, fs, etc.).
// So the recommended way is to use a bundler for preload.ts.
export default defineConfig({
  plugins: [tsconfigPaths({ projects: [tsconfigPath] })],
  resolve: {
    alias: {
      '@Desktop': path.resolve(__dirname, './src')
    }
  },
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
