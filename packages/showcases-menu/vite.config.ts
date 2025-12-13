/// <reference types="vitest" />
import compression from 'vite-plugin-compression';
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import path from 'path';
import { sharedAliases } from '../../vite.alias';
import { visualizer } from 'rollup-plugin-visualizer';
// @ts-expect-error: no type declarations
import vue from '@vitejs/plugin-vue';
// @ts-expect-error: no type declarations
import vueJsx from '@vitejs/plugin-vue-jsx';
import wasm from 'vite-plugin-wasm';
import { version } from './package.json';

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const root: string = process.cwd();
  const env: ImportMetaEnv = loadEnv(mode, root) as ImportMetaEnv;
  const { VITE_BUILD_COMPRESSION, VITE_BUILD_MINIFIED, VITE_BUILD_SOURCEMAPS, VITE_BUILD_TARGET_DIR } = env;

  if (command === 'build' && !VITE_BUILD_TARGET_DIR)
    throw new Error('[BUILD] Build must be run with a target(desktop/mobile/web). So, VITE_BUILD_TARGET_DIR mast be specified in .env file, but it is not.');

  const toBool = (v: string): boolean => v === 'true';
  const buildCompression: boolean = toBool(VITE_BUILD_COMPRESSION);
  const minify: boolean = toBool(VITE_BUILD_MINIFIED);
  const sourcemap: boolean = toBool(VITE_BUILD_SOURCEMAPS);

  return {
    base: './',
    define: {
      'import.meta.env.__MENU_APP_VERSION__': JSON.stringify(version),
      'import.meta.env.__MENU_APP_VERSION_HTML__': JSON.stringify(version.replaceAll(/\./g, '_'))
    },
    resolve: {
      alias: {
        ...sharedAliases,
        '@Public': path.resolve(__dirname, './public'),
        '@Showcases/Shared': path.resolve(__dirname, '../../packages/showcases-shared/src')
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      // vueDevTools(),
      wasm(), //Somehow needed by rxjs
      //Compression is only for web builds (desktop and mobile cannot unpack .br/.gz files)
      ...(buildCompression
        ? [
            compression({
              ext: '.gz',
              algorithm: 'gzip',
              deleteOriginFile: false,
              filter: /\.(js|mjs|json|css|map|html|glb|gltf|bin|wasm|txt|svg|csv|xml|shader|material|ttf|otf)$/i
            }),
            compression({
              ext: '.br',
              algorithm: 'brotliCompress',
              deleteOriginFile: false,
              filter: /\.(js|mjs|json|css|map|html|glb|gltf|bin|wasm|txt|svg|csv|xml|shader|material|ttf|otf)$/i
            })
          ]
        : [])
    ],
    build: {
      assetsInlineLimit: 0, // Do not inline assets and wasm
      target: 'esnext',
      sourcemap,
      minify,
      rollupOptions: {
        // external: (id: string): boolean => id.endsWith('.spec.ts') || id.endsWith('.test.ts'),
        //  external: ['three', 'rxjs', '@dimforge/rapier3d'], — If you want to exclude some dependencies from the bundle
        output: {
          // manualChunks: {
          // anarchy-engine: ['@Anarchy/Engine']
          // },
          inlineDynamicImports: false //extract workers to separate bundle
        },
        plugins: [visualizer({ open: false })]
      },
      outDir: VITE_BUILD_TARGET_DIR,
      emptyOutDir: true
    }
  };
});
