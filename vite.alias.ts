import path from 'path';

export const sharedAliases = {
  '@Shared': path.resolve(__dirname, 'packages/shared/src'),
  '@Engine': path.resolve(__dirname, 'packages/engine/src'),
  '@E2E': path.resolve(__dirname, 'packages/e2e/src')
};
