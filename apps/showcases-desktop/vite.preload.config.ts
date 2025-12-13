import path, { resolve } from 'path';
import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { version } from './package.json';
import { sharedAliases } from '../../vite.alias';

const tsconfigPath: string = resolve(__dirname, 'tsconfig.preload.json');

// We need vite for preload.ts, when we want to use imports.
// In the current version of electron, preload.ts can be CommonJS only (not ESM).
// And it hardly supports imports (and node modules such as path, fs, etc.).
// So the recommended way is to use a bundler for preload.ts.
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    define: {
      __DESKTOP_APP_VERSION__: JSON.stringify(version),
      __PLATFORM_MODE__: JSON.stringify(mode)
    },
    plugins: [tsconfigPaths({ projects: [tsconfigPath] })],
    resolve: {
      alias: {
        ...sharedAliases,
        '@Showcases/Desktop': path.resolve(__dirname, './src'),
        '@Showcases/Shared': path.resolve(__dirname, '../../packages/showcases-shared/src')
      }
    },
    build: {
      emptyOutDir: false, // Do not empty outDir, we build desktop-main.ts first there
      lib: {
        entry: './preload.ts',
        formats: ['cjs'], //prebuild.ts must be CommonJs module in the current electron version (otherwise we can get rid of Vite here)
        fileName: (): string => 'preload.js'
      },
      outDir: 'dist',
      rollupOptions: {
        external: ['electron', 'path', 'fs'], // Prevent bundling electron module
        output: {
          exports: 'named'
        }
      }
    }
  };
});
