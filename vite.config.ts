/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
      // '@Engine': path.resolve(__dirname, './src/Engine'),
      // '@App': path.resolve(__dirname, './src/App')
    }
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
        statements: 56,
        branches: 69,
        functions: 37,
        lines: 54
      }
    }
  }
});
