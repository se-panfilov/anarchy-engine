/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
      // '@Engine': path.resolve(__dirname, './src/Engine'),
      // '@App': path.resolve(__dirname, './src/App')
    }
  },
  plugins: [wasm()],
  build: {
    sourcemap: true
  },
  // optimizeDeps: {
  //   exclude: [
  //     "@dimforge/rapier3d"
  //   ]
  // },
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
