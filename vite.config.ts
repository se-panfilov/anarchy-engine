import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Engine': path.resolve(__dirname, './src/Engine'),
      '@App': path.resolve(__dirname, './src/App')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
});
