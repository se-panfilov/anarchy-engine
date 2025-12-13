import { defineConfig } from 'vite';
import path from 'path';

// Frankly, we can build electron-main.ts without Vite (just with tsc).
// But imports are such a pain, so it's easier to use a bundler.
export default defineConfig({
  resolve: {
    alias: {
      '@Desktop': path.resolve(__dirname, './src')
    }
  },
  build: {
    ssr: true, // This is a build for node, not for browser
    target: 'esnext',
    sourcemap: false,
    minify: false,
    outDir: 'dist',
    lib: {
      entry: './electron-main.ts',
      formats: ['es'],
      fileName: (): string => 'electron-main.js'
    },
    rollupOptions: {
      external: ['electron'] // Prevent bundling electron module
    }
  }
});
