/// <reference types="vitest" />
import type { ConfigEnv, Plugin, UserConfig } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import compression from 'vite-plugin-compression';
import dts from 'vite-plugin-dts';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
import wasm from 'vite-plugin-wasm';
import { sharedAliases } from '../../vite.alias';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root: string = process.cwd();
  const env: ImportMetaEnv = loadEnv(mode, root) as ImportMetaEnv;
  const { VITE_BUILD_COMPRESSION, VITE_BUILD_MINIFY_MANUAL, VITE_BUILD_MINIFY_MANGLE } = env;

  const buildCompression: boolean = VITE_BUILD_COMPRESSION === 'true';
  const minifyManual: boolean = VITE_BUILD_MINIFY_MANUAL === 'true';
  const enableMangle: boolean = VITE_BUILD_MINIFY_MANGLE === 'true';

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
      minify: enableMangle,
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
        plugins: [
          ...(minifyManual
            ? [
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
                  mangle: enableMangle,
                  format: {
                    comments: false,
                    ascii_only: true // To prevent emoji/unicode problems
                  }
                }) as Plugin
              ]
            : []),
          // TODO DESKTOP: Perhaps visualizer cannot correctly visualize the lib build (due to custom minify). Check it.
          visualizer({ open: false })
        ]
      },
      outDir: 'dist',
      emptyOutDir: true
    },
    dedupe: ['three', 'three-mesh-bvh', 'lodash', '@rwh/keystrokes', 'lodash-es', 'rxjs', 'nanoid', 'rbush', 'ts-key-enum', 'typescript-fsm', 'ajv', 'date-fns', '@dimforge/rapier3d'],
    // ssr: { noExternal: ['@dimforge/rapier3d-compat'] },
    test: {
      globals: true,
      environment: 'jsdom', // TODO try "node", could be faster.
      alias: {
        //Since we cannot use wasm version of @dimforge/rapier3d in vitest
        '@dimforge/rapier3d': '@dimforge/rapier3d-compat'
      },
      setupFiles: './vitest.setup.js',
      reporters: ['default', 'html'],
      outputFile: './reports/html/unit.html',
      include: ['src/**/*.spec.{js,mjs,cjs,ts,mts,cts}'],
      coverage: {
        reportsDirectory: './reports/coverage',
        include: ['src/**/*.{js,jsx,ts,tsx}'],
        exclude: [
          'src/**/index.ts',
          'src/**/Models/*.ts',
          'src/Mixins/GameObjects/Models/**/*.ts',
          'src/**/Constants/*.ts',
          'src/**/Math/Types/*.ts',
          'coverage',
          'utils/',
          'public',
          'vite.config.ts',
          '.eslintrc.js',
          'src/vite-env.d.ts',
          'src/App/DeveloperPanel/*',
          'e2e'
        ],
        thresholds: {
          statements: 9,
          branches: 4.9,
          functions: 11,
          lines: 9
        }
      }
    }
  };
});
