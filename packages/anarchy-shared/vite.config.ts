/// <reference types="vitest" />
import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
import { sharedAliases } from '../../vite.alias';
import { builtinModules } from 'node:module';

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
      }),
      viteStaticCopy({
        targets: [
          {
            src: 'src/assets/*',
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
        fileName: (format, entryName): string => {
          return `${entryName}/index.${format}.js`;
        }
      },

      rollupOptions: {
        external: (id: string): boolean => {
          if (id.endsWith('.spec.ts') || id.endsWith('.test.ts')) return true;

          // Node built-ins should never be bundled (they might appear in node-only helpers)
          const builtins = new Set([...builtinModules, ...builtinModules.map((m) => `node:${m}`)]);
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
