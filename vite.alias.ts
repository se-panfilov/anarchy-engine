import path from 'path';

export const sharedAliases = {
  '@E2E': path.resolve(__dirname, 'apps/e2e/src'),
  '@Engine': path.resolve(__dirname, 'packages/anarchy-engine/src'),
  '@Menu': path.resolve(__dirname, 'packages/showcases-menu/src'),
  '@Shared': path.resolve(__dirname, 'packages/anarchy-shared/src'),
  '@AnarchyI18n': path.resolve(__dirname, 'packages/anarchy-i18n/src'),
  lodash: 'lodash-es'
};
