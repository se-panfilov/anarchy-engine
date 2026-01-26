/// <reference types="vitest" />
import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'node:path';
import { sharedAliases } from '../../vite.alias';
import { builtinModules } from 'node:module';

export default defineConfig((_config: ConfigEnv): UserConfig => {
  const builtins = new Set([...builtinModules, ...builtinModules.map((m: string): string => `node:${m}`)]);

  return {
    base: './',
    resolve: {
      alias: {
        ...sharedAliases
      }
    },
    plugins: [
      dts({
        // Important: emit types into dist in the same structure as build output
        entryRoot: 'src',
        outDir: 'dist',
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
        exclude: ['**/*.spec.ts', '**/*.test.ts', 'vite.config.ts', 'src/Styles/OptionalStyles.ts'],
        // We don't need a root index.d.ts because package has no "." entry
        insertTypesEntry: false
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/assets/**/*',
            dest: 'assets'
          }
        ]
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
          // Subpath entrypoints
          Utils: path.resolve(__dirname, 'src/Utils/index.ts'),
          Constants: path.resolve(__dirname, 'src/Constants/index.ts'),
          Models: path.resolve(__dirname, 'src/Models/index.ts'),
          Plugins: path.resolve(__dirname, 'src/Plugins/index.ts')
        },
        name: 'AnarchyShared',
        formats: ['es'],
        fileName: (format, entryName): string => `${entryName}/index.${format}.js`
      },

      rollupOptions: {
        external: (id: string): boolean => {
          if (id.endsWith('.spec.ts') || id.endsWith('.test.ts')) return true;

          // Node built-ins must stay external (node-only helpers)
          if (builtins.has(id)) return true;

          // Keep deps external for library build
          return id === 'bowser' || id.startsWith('bowser/');
        },
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
