/// <reference types="vitest" />
import compression from 'vite-plugin-compression';
import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'path';
import { sharedAliases } from '../../vite.alias';
import { visualizer } from 'rollup-plugin-visualizer';
import wasm from 'vite-plugin-wasm';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root: string = process.cwd();
  const env: ImportMetaEnv = loadEnv(mode, root) as ImportMetaEnv;
  const { VITE_BUILD_COMPRESSION } = env;

  const toBool = (v: string): boolean => v === 'true';
  const buildCompression: boolean = toBool(VITE_BUILD_COMPRESSION as any);

  // console.log('XXX buildCompression', buildCompression); //make it true

  return {
    base: './',
    resolve: {
      alias: {
        ...sharedAliases
      }
    },
    plugins: [
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
      sourcemap: true,
      // TODO: Minify doesn't work in lib mode (@see: https://github.com/vitejs/vite/issues/6555 )
      minify: true,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'AnarchyEngine',
        fileName: (format): string => `anarchy-engine.${format}.js`,
        formats: ['es']
      },

      rollupOptions: {
        external: (id: string): boolean => id.endsWith('.spec.ts') || id.endsWith('.test.ts'),
        //  external: ['three', 'rxjs', '@dimforge/rapier3d'] — If you want to exclude some dependencies from the bundle
        output: {
          inlineDynamicImports: false //extract workers to separate bundle

          // Perhaps it's better not to use manualChunks for a lib build (also could be problems with minify)

          // manualChunks: {
          //   'anarchy-rapier3d': ['@dimforge/rapier3d'],
          //   'anarchy-three': ['three']
          // }

          // manualChunks(id: string): string | undefined {
          //   if (id === 'three' || id.includes('node_modules/three/')) return 'anarchy-three';
          //   if (id.includes('@dimforge/rapier3d')) return 'anarchy-rapier3d';
          //
          //   return undefined;
          // }
        },
        plugins: [visualizer({ open: false })]
      },
      outDir: 'dist',
      emptyOutDir: true
    },
    dedupe: ['three', 'three-mesh-bvh', 'lodash', '@rwh/keystrokes', 'lodash-es', 'rxjs', 'nanoid', 'rbush', 'ts-key-enum', 'typescript-fsm', 'ajv', 'date-fns', '@dimforge/rapier3d'],
    test: {
      globals: true,
      environment: 'jsdom', // TODO try "node", could be faster.
      alias: {
        //Since we cannot use wasm version of @dimforge/rapier3d in vitest
        '@dimforge/rapier3d': path.resolve(__dirname, 'node_modules/@dimforge/rapier3d-compat')
      },
      setupFiles: './vitest.setup.js',
      reporters: ['default', 'html'],
      outputFile: './reports/html/unit.html',
      include: ['src/**/*.spec.{js,mjs,cjs,ts,mts,cts}'],
      coverage: {
        all: false,
        reportsDirectory: './reports/coverage',
        include: ['src/**/*'],
        exclude: ['src/**/index.ts', 'coverage', 'utils/', 'public', 'vite.config.ts', '.eslintrc.js', 'src/vite-env.d.ts', 'src/App/DeveloperPanel/*', 'e2e'],
        thresholds: {
          statements: 15,
          branches: 60,
          functions: 30,
          lines: 15
        }
      }
    }
  };
});
