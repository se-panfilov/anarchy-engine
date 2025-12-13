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
  build: {
    sourcemap: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    reporters: ['default', 'html'],
    outputFile: './reports/html/unit.html',
    coverage: {
      all: true,
      reportsDirectory: './reports/coverage',
      include: ['src/**/*'],
      exclude: ['src/**/index.ts', 'coverage', 'utils/', 'public', 'vite.config.ts', '.eslintrc.js', 'src/vite-env.d.ts', 'src/App/DeveloperPanel/*'],
      thresholds: {
        statements: 40,
        branches: 60,
        functions: 30,
        lines: 40
      }
    }
  }
});
