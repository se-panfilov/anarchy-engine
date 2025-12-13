import type { TDocsService } from './TDocsService';
import type { TSettingsService } from './TSettingsService';

export type THandleRequestDependencies = Readonly<{
  settingsService: TSettingsService;
  docsService: TDocsService;
}>;
