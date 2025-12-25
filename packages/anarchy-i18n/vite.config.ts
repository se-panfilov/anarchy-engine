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
          'styles/anarchy-i18n': path.resolve(__dirname, 'src/Styles/OptionalStyles.ts')
        },
        name: 'AnarchyI18n',
        formats: ['es'],
        fileName: (format, entryName): string => {
          if (entryName === 'index') return `anarchy-i18n.${format}.js`;
          return `${entryName}.${format}.js`;
        }
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
        ],
        output: {
          assetFileNames: (assetInfo): string => {
            const ai = assetInfo as unknown as Readonly<{ name?: string; names?: ReadonlyArray<string> }>;
            const n: string = ai.names?.[0] ?? ai.name ?? '';

            if (n.endsWith('.css')) return 'styles/[name][extname]';
            if (n.endsWith('.css.map')) return 'styles/[name][extname]';
            return 'assets/[name]-[hash][extname]';
          }
        }
      },
      outDir: 'dist',
      emptyOutDir: true
    }
  };
});
