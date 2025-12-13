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
      exclude: ['coverage', 'utils/', 'public', 'vite.config.ts', '.eslintrc.js', 'src/vite-env.d.ts', 'src/App/DeveloperPanel/*'],
      statements: 0.5,
      branches: 0.5,
      functions: 0.5,
      lines: 0.5
    }
  }
});
