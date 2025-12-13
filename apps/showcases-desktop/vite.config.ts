import copy from 'rollup-plugin-copy';
import { ConfigEnv, defineConfig, UserConfig } from 'vite';
import path from 'path';
import { sharedAliases } from '../../vite.alias';
import { version } from './package.json';
import csp from 'vite-plugin-csp-guard';
import { PROD_CSP } from '../../configs/Security/Csp/CspConfig';

// Frankly, we can build desktop-main.ts without Vite (just with tsc).
// But imports are such a pain, so it's easier to use a bundler.
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  return {
    define: {
      __DESKTOP_APP_VERSION__: JSON.stringify(version)
    },
    resolve: {
      alias: {
        ...sharedAliases,
        '@Showcases/Desktop': path.resolve(__dirname, './src'),
        '@Showcases/Shared': path.resolve(__dirname, '../../packages/showcases-shared/src')
      }
    },
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
        plugins: [
          copy({
            targets: [
              {
                src: path.resolve(__dirname, '../showcases-core/dist-desktop'),
                dest: path.resolve(__dirname, 'dist')
              },
              //Electron cannot recognize three/examples/jsm/libs/draco import, so we copy files manually
              {
                src: path.resolve(__dirname, '../../node_modules/three/examples/jsm/libs/draco/draco_decoder.js'),
                dest: path.resolve(__dirname, 'dist/dist-desktop/three/examples/jsm/libs/draco/')
              },
              {
                src: path.resolve(__dirname, '../../node_modules/three/examples/jsm/libs/draco/draco_wasm_wrapper.js'),
                dest: path.resolve(__dirname, 'dist/dist-desktop/three/examples/jsm/libs/draco/')
              },
              {
                src: path.resolve(__dirname, '../../node_modules/three/examples/jsm/libs/draco/draco_decoder.wasm'),
                dest: path.resolve(__dirname, 'dist/dist-desktop/three/examples/jsm/libs/draco/')
              }
            ],
            hook: 'writeBundle'
          }),
          //Issue: CSP plugin doesn't add <Meta> tag in dev mode
          csp({
            dev: { run: true, outlierSupport: ['sass'] },
            policy: PROD_CSP,
            build: { sri: true }
          })
        ]
      },
      sourcemap: false,
      ssr: true, // This is a build for node, not for browser
      target: 'esnext'
    }
  };
});
