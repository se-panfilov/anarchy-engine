import { defineConfig } from 'vitest/config';
import { sharedAliases } from '../../vite.alias';

export default defineConfig({
  test: {
    alias: {
      ...sharedAliases
    }
  }
});
