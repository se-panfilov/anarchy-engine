import type { TLocaleId } from '@Anarchy/i18n';
import { AllowedSystemFolders } from '@Showcases/Desktop/Constants';
import type { TFilesService, TSettingsService } from '@Showcases/Desktop/Models';
import type { TResolution, TShowcaseGameSettings } from '@Showcases/Shared';
import { DefaultShowcaseGameSettings, isSettings } from '@Showcases/Shared';
import type { App } from 'electron';
import { screen } from 'electron';

// TODO DESKTOP: Add protection (allowed files list, name/extension checks, sanitization, etc)
export function SettingsService(app: App, filesService: TFilesService): TSettingsService {
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
        isFullScreen: true
      }
    };

    return {
      ...DefaultShowcaseGameSettings,
      ...platformDetectedSettings
    };
  }

  function detectResolution(): TResolution {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.size;
    return { width, height };
  }

  // TODO DESKTOP: in showcases-shared add function to get one preferred locale (use particular match as a fallback)
  function getPreferredLocales(): ReadonlyArray<TLocaleId> {
    return Array.from(new Set([...app.getPreferredSystemLanguages(), app.getLocale()] as ReadonlyArray<TLocaleId>));
  }

  function getScreenRatio(): number {
    const { width, height }: TResolution = detectResolution();
    return width / height;
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
    applyPlatformSettings,
    detectResolution,
    getPreferredLocales,
    getScreenRatio,
    loadAppSettings,
    saveAppSettings
  };
}
