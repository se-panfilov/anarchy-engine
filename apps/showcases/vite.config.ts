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
      filter: /\.(js|mjs|json|css|map|html|glb|gltf|bin|wasm|txt|svg|csv|xml|shader|material)$/i
    }),
    compression({
      ext: '.br',
      algorithm: 'brotliCompress',
      deleteOriginFile: false,
      filter: /\.(js|mjs|json|css|map|html|glb|gltf|bin|wasm|txt|svg|csv|xml|shader|material)$/i
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
