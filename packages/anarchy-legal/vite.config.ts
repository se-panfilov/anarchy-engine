/// <reference types="vitest" />
import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import { sharedAliases } from '../../vite.alias';
import { terser } from 'rollup-plugin-terser';

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
        exclude: ['**/*.spec.ts', '**/*.test.ts', 'vite.config.ts']
      })
    ],
    build: {
      target: 'esnext',
      sourcemap: true,
      // TODO: Minify doesn't work in lib mode (@see: https://github.com/vitejs/vite/issues/6555 )
      minify: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'AnarchyLegal',
        fileName: (format): string => `anarchy-legal.${format}.js`,
        formats: ['es']
      },

      rollupOptions: {
        external: (id: string): boolean => id.endsWith('.spec.ts') || id.endsWith('.test.ts'),
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
        ]
      },
      outDir: 'dist',
      emptyOutDir: true
    }
  };
});
