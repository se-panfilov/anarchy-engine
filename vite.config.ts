/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  plugins: [
    wasm(),
    // "topLevelAwait" needed only if build.target is not "esnext"
    topLevelAwait()
  ],
  worker: {
    // keep "format" as default value (not "es") if you want to use "topLevelAwait" plugin
    //@ts-expect-error
    plugins: [wasm(), topLevelAwait()]
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      // TODO PRODUCTION: "treeshake: false" is due to the issue with Rapier3d wasm module, check later if we could enable it.
      treeshake: false
    }
  },
  test: {
    globals: true,
    environment: 'jsdom', // TODO try "node", could be faster.
    alias: {
      //Since we cannot use wasm version of @dimforge/rapier3d in vitest
      '@dimforge/rapier3d': path.resolve(__dirname, 'node_modules/@dimforge/rapier3d-compat')
    },
    setupFiles: './vitest.setup.js',
    reporters: ['default', 'html'],
    outputFile: './reports/html/unit.html',
    coverage: {
      all: true,
      reportsDirectory: './reports/coverage',
      include: ['src/**/*'],
      exclude: ['src/**/index.ts', 'coverage', 'utils/', 'public', 'vite.config.ts', '.eslintrc.js', 'src/vite-env.d.ts', 'src/App/DeveloperPanel/*'],
      thresholds: {
        statements: 15,
        branches: 60,
        functions: 30,
        lines: 15
      }
    }
  }
});
