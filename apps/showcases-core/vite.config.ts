/// <reference types="vitest" />
import compression from 'vite-plugin-compression';
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { sharedAliases } from '../../vite.alias';
import { visualizer } from 'rollup-plugin-visualizer';
import wasm from 'vite-plugin-wasm';
// @ts-expect-error: no type declarations
import vue from '@vitejs/plugin-vue';
// @ts-expect-error: no type declarations
import vueJsx from '@vitejs/plugin-vue-jsx';
import { version } from './package.json';
import { version as engineVersion } from '../../packages/anarchy-engine/package.json';
import { version as anarchySharedVersion } from '../../packages/anarchy-shared/package.json';
import { version as anarchyI18nVersion } from '../../packages/anarchy-i18n/package.json';
import { version as anarchyLegalVersion } from '../../packages/anarchy-legal/package.json';
import { version as showcasesI18nVersion } from '../../packages/showcases-i18n/package.json';
import { version as showcasesMenuVersion } from '../../packages/showcases-menu/package.json';
import { version as showcasesGuiVersion } from '../../packages/showcases-gui/package.json';
import { version as showcasesSharedVersion } from '../../packages/showcases-shared/package.json';
import { emitDefineJson } from '../../packages/anarchy-shared/src/Plugins/EmitDefineVitePlugin';
import csp from 'vite-plugin-csp-guard';
import { BASE_CSP, DESKTOP_CSP, TCspRulles } from '../../configs/Security/Csp/CspConfig';

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
  const root: string = process.cwd();
  const env: ImportMetaEnv = loadEnv(mode, root) as ImportMetaEnv;
  const { VITE_BUILD_COMPRESSION, VITE_BUILD_MINIFIED, VITE_BUILD_SOURCEMAPS, VITE_BUILD_PLATFORM } = env;

  if (command === 'build' && !VITE_BUILD_PLATFORM)
    throw new Error('[BUILD] Build must be run with a target(desktop/mobile/web). So, VITE_BUILD_PLATFORM mast be specified in .env file, but it is not.');

  const toBool = (v: string): boolean => v === 'true';
  const buildCompression: boolean = toBool(VITE_BUILD_COMPRESSION);
  const minify: boolean = toBool(VITE_BUILD_MINIFIED);
  const sourcemap: boolean = toBool(VITE_BUILD_SOURCEMAPS);

  const buildMetaInfo = {
    'showcases-core': version,
    'anarchy-engine': engineVersion,
    'anarchy-shared': anarchySharedVersion,
    'anarchy-i18n': anarchyI18nVersion,
    'anarchy-legal': anarchyLegalVersion,
    'showcases-i18n': showcasesI18nVersion,
    'showcases-menu': showcasesMenuVersion,
    'showcases-gui': showcasesGuiVersion,
    'showcases-shared': showcasesSharedVersion
  };

  function getCspRules(platform: string): TCspRulles {
    switch (platform) {
      case 'desktop':
        return DESKTOP_CSP;
      case 'web':
      case 'mobile':
      default:
        return BASE_CSP;
    }
  }

  return {
    base: './',
    define: {
      'import.meta.env.__APP_VERSION__': JSON.stringify(version),
      'import.meta.env.__APP_VERSION_HTML__': JSON.stringify(version.replaceAll(/\./g, '_')),
      __BUILD_META_INFO__: JSON.stringify(buildMetaInfo),
      __PLATFORM_MODE__: JSON.stringify(mode)
    },
    resolve: {
      alias: {
        ...sharedAliases,
        '@': path.resolve(__dirname, './src'),
        '@Public': path.resolve(__dirname, './public'),
        '@Showcases/Shared': path.resolve(__dirname, '../../packages/showcases-shared/src'),

        //Virtual modules for platform API
        'platform:api': path.resolve(__dirname, `./src/Platform/Drivers/${VITE_BUILD_PLATFORM ?? 'web'}.ts`)
      }
    },
    plugins: [
      //FOR GUI only///////
      vue(),
      vueJsx(),
      //END: FOR GUI only///////

      //Issue: CSP plugin doesn't add <Meta> tag in dev mode
      csp({
        dev: { run: true, outlierSupport: ['sass'] },
        policy: getCspRules(VITE_BUILD_PLATFORM),
        build: { sri: true }
      }),

      //Build meta info (versions)
      emitDefineJson({ value: buildMetaInfo, fileName: 'build-meta.json' }),

      wasm(),
      dts({
        exclude: ['**/*.spec.ts', '**/*.test.ts', 'vite.config.ts']
      }),
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
    worker: {
      format: 'es',
      //@ts-expect-error
      plugins: [wasm()]
    },
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
      outDir: `dist-${VITE_BUILD_PLATFORM}`,
      emptyOutDir: true
    }
  };
});
