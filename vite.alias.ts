import path from 'path';

export const sharedAliases = {
  '@Shared': path.resolve(__dirname, 'packages/shared/src'),
  '@Engine': path.resolve(__dirname, 'packages/engine/src'),
  '@Menu': path.resolve(__dirname, 'packages/showcases-menu/src'),
  '@E2E': path.resolve(__dirname, 'apps/e2e/src'),
  lodash: 'lodash-es'
};
