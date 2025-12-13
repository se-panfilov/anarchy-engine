import type { TSettingsService } from './TSettingsService';

export type THandleRequestDependencies = Readonly<{
  settingsService: TSettingsService;
}>;
