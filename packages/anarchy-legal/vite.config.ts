/// <reference types="vitest" />
import type { ConfigEnv, UserConfig } from 'vite';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';
import { builtinModules } from 'node:module';

const nodeBuiltins: ReadonlyArray<string> = [...builtinModules, ...builtinModules.map((m) => `node:${m}`)];

// Packages that should stay as runtime dependencies (not bundled).
const runtimeExternals: ReadonlyArray<string> = ['yargs', 'yargs/helpers', 'globby', 'date-fns', '@date-fns/utc'];

export default defineConfig((_config: ConfigEnv): UserConfig => {
  return {
    plugins: [
      dts({
        entryRoot: 'src',
        outDir: 'dist',
        tsconfigPath: path.resolve(__dirname, 'tsconfig.json'),
        exclude: ['**/*.spec.ts', '**/*.test.ts', 'vite.config.ts'],
        // Important: creates dist/index.d.ts automatically when you have src/index.ts
        insertTypesEntry: true
      })
    ],
    build: {
      // Node-only library build
      ssr: true,
      target: 'node18',
      sourcemap: true,
      minify: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: ['es'],
        fileName: (): string => 'index.js'
      },
      rollupOptions: {
        external: (id: string): boolean => {
          if (id.endsWith('.spec.ts') || id.endsWith('.test.ts')) return true;
          if (nodeBuiltins.includes(id)) return true;
          // externalize runtime deps (and their subpaths)
          return runtimeExternals.some((p) => id === p || id.startsWith(`${p}/`));
        },
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: `[name].js`,
          chunkFileNames: `chunks/[name]-[hash].js`,
          assetFileNames: (assetInfo): string => {
            const ai = assetInfo as unknown as Readonly<{ name?: string; names?: ReadonlyArray<string> }>;
            const n: string = ai.names?.[0] ?? ai.name ?? '';

            if (n.endsWith('.css')) return 'styles/[name][extname]';
            if (n.endsWith('.css.map')) return 'styles/[name][extname]';
            return 'assets/[name]-[hash][extname]';
          },
          inlineDynamicImports: false //extract workers to separate bundle
        }
      },
      outDir: 'dist',
      emptyOutDir: true
    }
  };
});
