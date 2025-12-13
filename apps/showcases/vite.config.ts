/// <reference types="vitest" />
import compression from 'vite-plugin-compression';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import { sharedAliases } from '../../vite.alias';
import { visualizer } from 'rollup-plugin-visualizer';
import wasm from 'vite-plugin-wasm';

const isWeb: boolean = process.env.BUILD_TARGET === 'web';

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Public': path.resolve(__dirname, './public'),
      ...sharedAliases
    }
  },
  // minify: 'terser', //could have better compression (make sure wasm is not broken)
  plugins: [
    wasm(),
    dts({
      exclude: ['**/*.spec.ts', '**/*.test.ts', 'vite.config.ts']
    }),
    //Compression is only for web builds (desktop and mobile cannot unpack .br/.gz files)
    ...(isWeb
      ? [
          compression({
            ext: '.gz',
            algorithm: 'gzip',
            deleteOriginFile: false,
            filter: /\.(js|mjs|json|css|map|html|glb|gltf|bin|wasm|txt|svg|csv|xml|shader|material|ttf|otf)$/i
          }),
          compression({
            ext: '.br',
            algorithm: 'brotliCompress',
            deleteOriginFile: false,
            filter: /\.(js|mjs|json|css|map|html|glb|gltf|bin|wasm|txt|svg|csv|xml|shader|material|ttf|otf)$/i
          })
        ]
      : [])
  ],
  worker: {
    format: 'es',
    //@ts-expect-error
    plugins: [wasm()]
  },
  build: {
    assetsInlineLimit: 0, // Do not inline assets and wasm
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      // external: (id: string): boolean => id.endsWith('.spec.ts') || id.endsWith('.test.ts'),
      //  external: ['three', 'rxjs', '@dimforge/rapier3d'], — If you want to exclude some dependencies from the bundle
      output: {
        // manualChunks: {
        // anarchy_engine: ['@Engine']
        // },
        inlineDynamicImports: false //extract workers to separate bundle
      },
      plugins: [visualizer({ open: false })]
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});
