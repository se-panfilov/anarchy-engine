import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import path from 'path';
import { sharedAliases } from '../../vite.alias';
import { version } from './package.json';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const toPosix = (p: string) => p.split(path.sep).join('/');

const CORE_DIST_DIR: string = path.resolve(__dirname, '../showcases-core/dist-desktop');
const DRACO_DIR: string = path.resolve(__dirname, '../../node_modules/three/examples/jsm/libs/draco');

// Frankly, we can build desktop-main.ts without Vite (just with tsc).
// But imports are such a pain, so it's easier to use a bundler.
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    define: {
      __DESKTOP_APP_VERSION__: JSON.stringify(version),
      __PLATFORM_MODE__: JSON.stringify(mode) //always 'production' (for vite, but not for electron)
    },
    resolve: {
      alias: {
        ...sharedAliases,
        '@Showcases/Desktop': path.resolve(__dirname, './src'),
        '@Showcases/Shared': path.resolve(__dirname, '../../packages/showcases-shared/src')
      }
    },
    plugins: [
      viteStaticCopy({
        targets: [
          // Copy all files from showcases-core build, preserving structure
          {
            src: toPosix(path.resolve(CORE_DIST_DIR, '**/*')),
            dest: 'dist-desktop'
          },
          //Electron cannot recognize three/examples/jsm/libs/draco import, so we copy files manually
          {
            src: toPosix(path.resolve(DRACO_DIR, 'draco_decoder.js')),
            dest: 'dist-desktop/three/examples/jsm/libs/draco'
          },
          {
            src: toPosix(path.resolve(DRACO_DIR, 'draco_wasm_wrapper.js')),
            dest: 'dist-desktop/three/examples/jsm/libs/draco'
          },
          {
            src: toPosix(path.resolve(DRACO_DIR, 'draco_decoder.wasm')),
            dest: 'dist-desktop/three/examples/jsm/libs/draco'
          }
        ]
      })
    ],
    build: {
      emptyOutDir: false, // Do not empty outDir, we build app there first
      lib: {
        entry: './src/desktop-main.ts',
        formats: ['es'],
        fileName: (): string => 'desktop-main.js'
      },
      minify: false,
      outDir: 'dist',
      rollupOptions: {
        external: ['electron', 'path', 'fs'], // Prevent bundling electron and node modules
        plugins: []
      },
      sourcemap: false,
      ssr: true, // This is a build for node, not for browser
      target: 'esnext'
    }
  };
});
