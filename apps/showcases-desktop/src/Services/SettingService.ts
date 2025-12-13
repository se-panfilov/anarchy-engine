import type { TLocale, TLocaleId } from '@Anarchy/i18n';
import { getLocaleByLocaleId, getPreferLocaleId } from '@Anarchy/i18n';
import { AllowedSystemFolders } from '@Showcases/Desktop/Constants';
import type { TSettingsService, TSettingsServiceDependencies } from '@Showcases/Desktop/Models';
import { detectResolution } from '@Showcases/Desktop/Utils';
import { ShowcasesFallbackLocale, ShowcasesLocales } from '@Showcases/i18n';
import type { TShowcaseGameSettings } from '@Showcases/Shared';
import { DefaultShowcaseGameSettings, isSettings } from '@Showcases/Shared';
import type { App } from 'electron';

// TODO DESKTOP: Add protection (allowed files list, name/extension checks, sanitization, etc)
export function SettingsService(app: App, { filesService, windowService }: TSettingsServiceDependencies): TSettingsService {
  const userDataFolder: AllowedSystemFolders = AllowedSystemFolders.UserData;
  const appSettingsFileName: string = 'app-settings.json';

  const readAppSettings = async (): Promise<TShowcaseGameSettings> => {
    try {
      return await filesService.readFileAsJson(appSettingsFileName, userDataFolder, isSettings);
    } catch {
      console.log(`[DESKTOP] Settings file ("${appSettingsFileName}") not found in : ${userDataFolder}. Applying default settings.`);
      const settings: TShowcaseGameSettings = buildDefaultSettings();
      await writeAppSettings(settings);
      return settings;
    }
  };

  function buildDefaultSettings(): TShowcaseGameSettings {
    const availableLocales: ReadonlyArray<TLocale> = Object.values(ShowcasesLocales);
    const availableLocalesIds: ReadonlyArray<TLocaleId> = availableLocales.map((locale: TLocale): TLocaleId => locale.id);
    const locale: TLocale = getLocaleByLocaleId(getPreferLocaleId(getPreferredLocales(), availableLocalesIds, ShowcasesFallbackLocale.id), availableLocales);

    const platformDetectedSettings: Partial<TShowcaseGameSettings> = {
      graphics: {
        ...DefaultShowcaseGameSettings.graphics,
        resolution: detectResolution(),
        isFullScreen: true
      },
      localization: {
        ...DefaultShowcaseGameSettings.localization,
        locale
      }
    };

    return {
      ...DefaultShowcaseGameSettings,
      ...platformDetectedSettings
    };
  }

  const getPreferredLocales = (): ReadonlyArray<TLocaleId> => Array.from(new Set([...app.getPreferredSystemLanguages(), app.getLocale()] as ReadonlyArray<TLocaleId>));

  async function writeAppSettings(settings: TShowcaseGameSettings): Promise<void> {
    if (!isSettings(settings)) throw new Error('[DESKTOP] Attempted to save invalid app settings');
    await filesService.writeFile(appSettingsFileName, userDataFolder, JSON.stringify(settings, null, 2));
    console.log(`[DESKTOP] Saved settings file ("${appSettingsFileName}") in : ${userDataFolder}`);
  }

  //Return true if app restart is needed
  function applyPlatformSettings(settings: TShowcaseGameSettings): boolean {
    console.log('[DESKTOP] Applying platform settings');

    const isFullScreenNow: boolean = windowService.isFullScreen();
    const isFullScreenIntended: boolean = Boolean(settings.graphics.isFullScreen);
    if (isFullScreenNow !== isFullScreenIntended) windowService.setFullScreen(isFullScreenIntended);

    //Requires restart: app.disableHardwareAcceleration()
    return false;
  }

  return {
    applyPlatformSettings,
    detectResolution,
    getPreferredLocales,
    readAppSettings,
    writeAppSettings
  };
}
