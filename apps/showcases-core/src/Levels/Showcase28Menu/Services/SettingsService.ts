import type { TShowcasesGameSettings } from '@Showcases/Shared';

import type { TSettingsService } from '@/Levels/Showcase28Menu/Models';
import { platformApiService } from '@/Services';

export function SettingsService(): TSettingsService {
  function applyAppSettings(appSettings: TShowcasesGameSettings): boolean {
    console.log('[SettingsService]: (NOT IMPLEMENTED) Applying app settings:', appSettings);
    //  Apply app-level settings (lang, etc.)
    //  return "true" if app restart is needed
    return false;
  }

  const setFirstRun = (isFirstRun: boolean): Promise<void> => platformApiService.setFirstRun(isFirstRun);

  async function isFirstRun(): Promise<boolean> {
    const appSettings: TShowcasesGameSettings = await platformApiService.getAppSettings();
    return appSettings.internal?.isFirstRun ?? true;
  }

  return {
    applyAppSettings,
    isFirstRun,
    setFirstRun
  };
}
