/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@public': path.resolve(__dirname, './public'),
      '@Engine': path.resolve(__dirname, '../../packages/engine/src')
    }
  },
  plugins: [wasm()],
  worker: {
    format: 'es',
    //@ts-expect-error
    plugins: [wasm()]
  },
  build: {
    target: 'esnext',
    sourcemap: true
  }
});
