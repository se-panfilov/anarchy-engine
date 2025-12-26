/// <reference types="vitest" />
import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import { sharedAliases } from '../../vite.alias';
import { terser } from 'rollup-plugin-terser';

const externals: ReadonlyArray<string> = [
  // keep these deps external so Vite/Rollup doesn't try to bundle node/browsers builds together
  '@sentry/browser',
  '@sentry/core',
  '@sentry/electron',
  '@sentry/electron/main',
  '@sentry/electron/renderer',
  '@sentry/electron/esm/main',
  'dotenv',

  // node built-ins (in case something leaks in)
  'node:os',
  'node:path',
  'node:util'
];

export default defineConfig((_config: ConfigEnv): UserConfig => {
  return {
    base: './',
    resolve: {
      alias: {
        ...sharedAliases
      }
    },
    plugins: [
      dts({
        exclude: ['**/*.spec.ts', '**/*.test.ts', 'vite.config.ts', 'src/Styles/OptionalStyles.ts']
      })
    ],
    build: {
      target: 'esnext',
      sourcemap: true,
      // TODO: Minify doesn't work in lib mode (@see: https://github.com/vitejs/vite/issues/6555 )
      minify: false,
      cssCodeSplit: true,
      lib: {
        entry: {
          index: path.resolve(__dirname, 'src/index.ts'),
          browser: path.resolve(__dirname, 'src/browser.ts'),
          desktop: path.resolve(__dirname, 'src/desktop.ts'),
          'desktop-preload': path.resolve(__dirname, 'src/desktop-preload.ts')
        },
        name: 'AnarchyTracking',
        formats: ['es'],
        fileName: (format, entryName): string => {
          if (entryName === 'index') return `anarchy-tracking.${format}.js`;
          return `${entryName}.${format}.js`;
        }
      },

      rollupOptions: {
        external: (id: string): boolean => {
          if (id.endsWith('.spec.ts') || id.endsWith('.test.ts')) return true;
          if (externals.includes(id)) return true;
          // subpath imports from sentry packages (e.g. @sentry/node-core/...) should stay external too
          if (id.startsWith('@sentry/')) return true;
          // any node builtin (node:*) must stay external
          if (id.startsWith('node:')) return true;
          return false;
        },
        plugins: [
          terser({
            compress: {
              passes: 3, // Rerun compress multiple times
              pure_getters: true,
              unsafe: false, // Turn on only if the code is pure
              unsafe_arrows: false, // Could break "this" in arrow functions
              unsafe_methods: false, // Risky
              unsafe_comps: false, // Optimize comparisons `a <= b`
              drop_console: false,
              drop_debugger: true,
              defaults: true // Default number of optimizations
            },
            mangle: false,
            format: {
              comments: false,
              ascii_only: true // To prevent emoji/unicode problems
            }
          }) as Plugin
        ],
        output: {
          // Make filenames deterministic / readable for library consumers.
          entryFileNames: '[name]/index.[format].js',
          chunkFileNames: 'chunks/[name].js'
        }
      },
      outDir: 'dist',
      emptyOutDir: true
    }
  };
});
