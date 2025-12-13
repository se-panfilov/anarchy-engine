/// <reference types="vitest" />
import compression from 'vite-plugin-compression';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import { sharedAliases } from '../../vite.alias';
import { visualizer } from 'rollup-plugin-visualizer';
import wasm from 'vite-plugin-wasm';

export default defineConfig({
  resolve: {
    alias: {
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
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'AnarchyEngine',
      fileName: (format): string => `anarchy-engine.${format}.js`,
      formats: ['es']
    },
    target: 'esnext',
    sourcemap: true,
    rollupOptions: {
      external: (id: string): boolean => id.endsWith('.spec.ts') || id.endsWith('.test.ts'),
      //  external: ['three', 'rxjs', '@dimforge/rapier3d'] — If you want to exclude some dependencies from the bundle
      output: {
        manualChunks: {
          'anarchy-rapier3d': ['@dimforge/rapier3d']
        }
      },
      plugins: [visualizer({ open: false })]
    },
    outDir: 'dist',
    emptyOutDir: true
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
    include: ['src/**/*.spec.{js,mjs,cjs,ts,mts,cts}'],
    coverage: {
      all: false,
      reportsDirectory: './reports/coverage',
      include: ['src/**/*'],
      exclude: ['src/**/index.ts', 'coverage', 'utils/', 'public', 'vite.config.ts', '.eslintrc.js', 'src/vite-env.d.ts', 'src/App/DeveloperPanel/*', 'e2e'],
      thresholds: {
        statements: 15,
        branches: 60,
        functions: 30,
        lines: 15
      }
    }
  }
});
