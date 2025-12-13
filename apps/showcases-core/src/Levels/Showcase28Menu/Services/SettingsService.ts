import type { TShowcaseGameSettings } from '@Showcases/Shared';

import type { TSettingsService } from '@/Levels/Showcase28Menu/Models';
import { platformApiService } from '@/Services';

export function SettingsService(): TSettingsService {
  function applyAppSettings(appSettings: TShowcaseGameSettings): boolean {
    console.log('[SettingsService]: (NOT IMPLEMENTED) Applying app settings:', appSettings);
    // TODO DESKTOP: Apply app-level settings (lang, etc.)
    // TODO DESKTOP: return true if app restart is needed
    return false;
  }

  const setFirstRun = (isFirstRun: boolean): Promise<void> => platformApiService.setFirstRun(isFirstRun);

  async function isFirstRun(): Promise<boolean> {
    const appSettings: TShowcaseGameSettings = await platformApiService.getAppSettings();
    return appSettings.internal?.isFirstRun ?? true;
  }

  return {
    applyAppSettings,
    isFirstRun,
    setFirstRun
  };
}
