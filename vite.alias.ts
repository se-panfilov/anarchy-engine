import path from 'node:path';

export const sharedAliases = {
  '@Showcases/E2E': path.resolve(__dirname, 'apps/showcases-e2e/src'),
  '@Showcases/GUI': path.resolve(__dirname, 'packages/showcases-gui/src'),
  '@Showcases/I18N': path.resolve(__dirname, 'packages/showcases-i18n/src'),
  '@Showcases/Menu': path.resolve(__dirname, 'packages/showcases-menu/src'),
  '@Showcases/Shared': path.resolve(__dirname, 'packages/showcases-shared/src'),
  '@hellpig/anarchy-engine': path.resolve(__dirname, 'packages/anarchy-engine/src'),
  '@hellpig/anarchy-i18n': path.resolve(__dirname, 'packages/anarchy-i18n/src'),
  '@hellpig/anarchy-legal': path.resolve(__dirname, 'packages/anarchy-legal/src'),
  '@hellpig/anarchy-shared': path.resolve(__dirname, 'packages/anarchy-shared/src'),
  '@hellpig/anarchy-tracking': path.resolve(__dirname, 'packages/anarchy-tracking/src'),

  lodash: 'lodash-es'
};
