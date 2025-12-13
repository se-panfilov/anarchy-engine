/// <reference types="vitest" />
import compression from 'vite-plugin-compression';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import { sharedAliases } from '../../vite.alias';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Public': path.resolve(__dirname, './public'),
      ...sharedAliases
    }
  },
  plugins: [
    wasm(),
    dts({
      exclude: ['**/*.spec.ts', '**/*.test.ts', 'vite.config.ts']
    }),
    compression({
      ext: '.gz',
      algorithm: 'gzip',
      deleteOriginFile: false,
      filter: (file) => /\.(js|css|map|wasm)$/.test(file)
    }),
    compression({
      ext: '.br',
      algorithm: 'brotliCompress',
      deleteOriginFile: false,
      filter: (file) => /\.(js|css|map|wasm)$/.test(file)
    })
  ],
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
