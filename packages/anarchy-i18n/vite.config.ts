/// <reference types="vitest" />
import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
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
        entryRoot: 'src',
        outDir: 'dist',
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
        exclude: ['**/*.spec.ts', '**/*.test.ts', 'vite.config.ts', 'src/Styles/OptionalStyles.ts'],
        // Important: creates dist/index.d.ts automatically when you have src/index.ts
        insertTypesEntry: true
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
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: `[name].js`,
          chunkFileNames: `chunks/[name]-[hash].js`,
          // assetFileNames: (assetInfo): string => {
          //   const ai = assetInfo as unknown as Readonly<{ name?: string; names?: ReadonlyArray<string> }>;
          //   const n: string = ai.names?.[0] ?? ai.name ?? '';
          //
          //   if (n.endsWith('.css')) return 'styles/[name][extname]';
          //   if (n.endsWith('.css.map')) return 'styles/[name][extname]';
          //   return 'assets/[name]-[hash][extname]';
          // },
          inlineDynamicImports: false //extract workers to separate bundle
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
        ]
      },
      outDir: 'dist',
      emptyOutDir: true
    }
  };
});
