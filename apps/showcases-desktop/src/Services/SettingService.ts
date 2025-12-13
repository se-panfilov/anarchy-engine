import { AllowedSystemFolders } from '@Showcases/Desktop/Constants';
import type { TFilesService, TSettingsService } from '@Showcases/Desktop/Models';
import type { TShowcaseGameSettings } from '@Showcases/Shared';
import { DefaultShowcaseGameSettings, isSettings } from '@Showcases/Shared';

// TODO DESKTOP: Add protection (allowed files list, name/extension checks, sanitization, etc)
export function SettingsService(filesService: TFilesService): TSettingsService {
  const userDataFolder: AllowedSystemFolders = AllowedSystemFolders.UserData;
  const appSettingsFileName: string = 'user-config.json';

  // TODO DESKTOP: rename load/save to read/write
  // TODO DESKTOP: What should happen when no settings? Return values from desktop?
  //  Use defaults from the main app? (or send partial settings, what were detected by the desktop app)
  const loadAppSettings = async (): Promise<TShowcaseGameSettings> => {
    try {
      return filesService.readFileAsJson(appSettingsFileName, userDataFolder, isSettings);
    } catch {
      console.log(`[DESKTOP]: Settings file ("${appSettingsFileName}") not found in : ${userDataFolder}. Applying default settings.`);
      return buildDefaultSettings();
    }
  };

  function buildDefaultSettings(): TShowcaseGameSettings {
    const platformDetectedSettings: Partial<TShowcaseGameSettings> = {
      graphics: {
        ...DefaultShowcaseGameSettings.graphics,
        resolution: detectResolution(),
        isFullScreen: false
      }
    };

    return {
      ...DefaultShowcaseGameSettings,
      ...platformDetectedSettings
    };
  }

  function detectResolution(): { width: number; height: number } {
    // TODO DESKTOP: Implement actual resolution detection
    return { width: 1280, height: 720 };
  }

  async function saveAppSettings(settings: TShowcaseGameSettings): Promise<void> {
    if (!isSettings(settings)) throw new Error('[DESKTOP]: Attempted to save invalid app settings');
    await filesService.writeFile(appSettingsFileName, userDataFolder, JSON.stringify(settings, null, 2));
    console.log(`[DESKTOP]: Saved settings file ("${appSettingsFileName}") in : ${userDataFolder}`);
  }

  // TODO DESKTOP: Maybe split TShowcaseGameSettings into app and platform settings
  function applyPlatformSettings(platformSettings: TShowcaseGameSettings): boolean {
    console.log('[DESKTOP]: (NOT IMPLEMENTED) Applying platform settings:', platformSettings);
    // TODO DESKTOP: Apply platform-level settings (resolution, etc.)
    // TODO DESKTOP: return true if app restart is needed
    return false;
  }

  return {
    loadAppSettings,
    saveAppSettings,
    applyPlatformSettings
  };
}
