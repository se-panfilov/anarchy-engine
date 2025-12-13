import type { TLocale, TLocaleId } from '@Anarchy/i18n';
import { getLocaleByLocaleId, getPreferLocaleId } from '@Anarchy/i18n';
import { patchObject } from '@Anarchy/Shared/Utils';
import { AllowedSystemFolders } from '@Showcases/Desktop/Constants';
import type { TSettingsService, TSettingsServiceDependencies } from '@Showcases/Desktop/Models';
import { detectResolution } from '@Showcases/Desktop/Utils';
import { ShowcasesFallbackLocale, ShowcasesLocales } from '@Showcases/i18n';
import type { TShowcaseGameSettings } from '@Showcases/Shared';
import { DefaultShowcaseGameSettings, isSettings } from '@Showcases/Shared';
import type { App } from 'electron';

export function SettingsService(app: App, { filesService, windowService }: TSettingsServiceDependencies): TSettingsService {
  const userDataFolder: AllowedSystemFolders = AllowedSystemFolders.UserData;
  const appSettingsFileName: string = 'app-settings.json';

  const getAppSettings = async (): Promise<TShowcaseGameSettings> => {
    try {
      return await filesService.readFileAsJson(appSettingsFileName, userDataFolder, isSettings);
    } catch (e) {
      console.warn(`[DESKTOP] Cannot read settings file ("${appSettingsFileName}") from : ${userDataFolder}. Damaged or not existed. Applying default settings. Error: ${(e as Error).message}`);
      const settings: TShowcaseGameSettings = buildDefaultSettings();
      await setAppSettings(settings);
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

  async function updateAppSettings(partialSettings: Partial<TShowcaseGameSettings>): Promise<TShowcaseGameSettings> {
    const currentSettings: TShowcaseGameSettings = await getAppSettings();
    const newSettings: TShowcaseGameSettings = patchObject(currentSettings, partialSettings);
    await setAppSettings(newSettings);
    console.log('[DESKTOP] Updated app settings');
    return newSettings;
  }

  async function setAppSettings(settings: TShowcaseGameSettings): Promise<void> {
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
    getAppSettings,
    updateAppSettings,
    setAppSettings
  };
}
