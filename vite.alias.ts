import path from 'path';

export const sharedAliases = {
  '@E2E': path.resolve(__dirname, 'apps/e2e/src'),
  '@Engine': path.resolve(__dirname, 'packages/engine/src'),
  '@Menu': path.resolve(__dirname, 'packages/showcases-menu/src'),
  '@Shared': path.resolve(__dirname, 'packages/shared/src'),
  '@ShowcasesShared': path.resolve(__dirname, 'packages/showcase-shared/src'),
  lodash: 'lodash-es'
};
