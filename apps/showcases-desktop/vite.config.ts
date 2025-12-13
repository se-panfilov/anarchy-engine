import copy from 'rollup-plugin-copy';
import { defineConfig } from 'vite';
import path from 'path';
import { version } from './package.json';

// Frankly, we can build electron-main.ts without Vite (just with tsc).
// But imports are such a pain, so it's easier to use a bundler.
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version)
  },
  resolve: {
    alias: {
      '@Desktop': path.resolve(__dirname, './src')
    }
  },
  build: {
    emptyOutDir: false, // Do not empty outDir, we build app there first
    lib: {
      entry: './electron-main.ts',
      formats: ['es'],
      fileName: (): string => 'electron-main.js'
    },
    minify: false,
    outDir: 'dist',
    rollupOptions: {
      external: ['electron', 'path', 'fs'], // Prevent bundling electron and node modules
      plugins: [
        copy({
          targets: [
            {
              src: path.resolve(__dirname, '../showcases/dist-desktop'),
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
        })
      ]
    },
    sourcemap: false,
    ssr: true, // This is a build for node, not for browser
    target: 'esnext'
  }
});
