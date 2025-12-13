/// <reference types="vitest" />
import { defineConfig } from 'vite';
import path from 'path';
import wasm from 'vite-plugin-wasm';
import { sharedAliases } from '../../vite.alias';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Public': path.resolve(__dirname, './public'),
      ...sharedAliases
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
