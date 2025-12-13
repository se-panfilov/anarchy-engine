import type { TShowcaseGameSettings } from '@Showcases/Shared';

import type { TSettingsService } from '@/Levels/Showcase28Menu/Models';

export function SettingsService(): TSettingsService {
  function applyAppSettings(appSettings: TShowcaseGameSettings): boolean {
    console.log('[SettingsService]: (NOT IMPLEMENTED) Applying app settings:', appSettings);
    // TODO DESKTOP: Apply app-level settings (lang, etc.)
    // TODO DESKTOP: return true if app restart is needed
    return false;
  }

  return {
    applyAppSettings
  };
}
