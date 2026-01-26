import type { TLocale, TLocaleId } from '@Anarchy/i18n';
import { getLocaleByLocaleId, getPreferLocaleId } from '@Anarchy/i18n';
import { isDefined, patchObject } from '@Anarchy/Shared/Utils';
import { AllowedSystemFolders } from '@Showcases/Desktop/Constants';
import type { TSettingsService, TSettingsServiceDependencies } from '@Showcases/Desktop/Models';
import { detectResolution } from '@Showcases/Desktop/Utils';
import { ShowcasesFallbackLocale, ShowcasesLocales } from '@Showcases/i18n';
import type { TResolution, TShowcasesGameSettings } from '@Showcases/Shared';
import { DefaultShowcaseGameSettings, isSettings } from '@Showcases/Shared';
import type { App } from 'electron';

export function SettingsService(app: App, { filesService, windowService }: TSettingsServiceDependencies): TSettingsService {
  const userDataFolder: AllowedSystemFolders = AllowedSystemFolders.UserData;
  const appSettingsFileName: string = 'app-settings.json';

  const getAppSettings = async (): Promise<TShowcasesGameSettings> => {
    const isE2E: boolean = import.meta.env.VITE_IS_E2E === 'true' || false;
    if (isE2E) return setDefaultSettings({ message: '[DESKTOP][E2E] Forced default desktop app settings (VITE_IS_E2E)' } as Error);

    try {
      const settings: TShowcasesGameSettings = await filesService.readFileAsJson(appSettingsFileName, userDataFolder, isSettings);
      return mergeCliSettingsWithDetected(settings);
    } catch (e) {
      return setDefaultSettings(e as Error);
    }
  };

  async function setDefaultSettings(e: Error): Promise<TShowcasesGameSettings> {
    console.warn(`[DESKTOP] Cannot read settings file ("${appSettingsFileName}") from : ${userDataFolder}. Damaged or not existed. Applying default settings. Error: ${e.message}`);
    const settings: TShowcasesGameSettings = buildDefaultSettings();
    await setAppSettings(settings);
    return settings;
  }

  function getResolutionFromCommandLine(): TResolution | undefined {
    const widthStr: string = app.commandLine.getSwitchValue('width');
    const heightStr: string = app.commandLine.getSwitchValue('height');

    const width: number = Number.parseInt(widthStr, 10);
    const height: number = Number.parseInt(heightStr, 10);

    if (!Number.isNaN(width) && !Number.isNaN(height) && width > 0 && height > 0) {
      console.log(`[DESKTOP] CLI args: resolution: ${width}x${height}`);
      return { width, height };
    }

    return undefined;
  }

  function getIsFullScreenFromCommandLine(): boolean | undefined {
    const isFullScreenStr: string = app.commandLine.getSwitchValue('fullscreen');
    if (isFullScreenStr) console.log(`[DESKTOP] CLI args: fullscreen: ${isFullScreenStr}`);
    if (isFullScreenStr === 'true') return true;
    if (isFullScreenStr === 'false') return false;
    return undefined;
  }

  function getCommandLineSettings(): { resolution: TResolution; isFullScreen: boolean } {
    const resolution: TResolution = getResolutionFromCommandLine() ?? detectResolution();
    const isFullScreen: boolean = getIsFullScreenFromCommandLine() ?? true;

    return {
      resolution,
      isFullScreen
    };
  }

  function mergeCliSettingsWithDetected(settings: TShowcasesGameSettings): TShowcasesGameSettings {
    const { resolution, isFullScreen } = getCommandLineSettings();
    let result = { ...settings };
    if (isDefined(resolution)) result = patchObject(result, { graphics: { resolution } });
    if (isDefined(isFullScreen)) result = patchObject(result, { graphics: { isFullScreen } });
    return result;
  }

  function buildDefaultSettings(): TShowcasesGameSettings {
    const availableLocales: ReadonlyArray<TLocale> = Object.values(ShowcasesLocales);
    const availableLocalesIds: ReadonlyArray<TLocaleId> = availableLocales.map((locale: TLocale): TLocaleId => locale.id);
    const locale: TLocale = getLocaleByLocaleId(getPreferLocaleId(getPreferredLocales(), availableLocalesIds, ShowcasesFallbackLocale.id), availableLocales);

    const platformDetectedSettings: Partial<TShowcasesGameSettings> = {
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

    return mergeCliSettingsWithDetected({
      ...DefaultShowcaseGameSettings,
      ...platformDetectedSettings
    });
  }

  const getPreferredLocales = (): ReadonlyArray<TLocaleId> => Array.from(new Set([...app.getPreferredSystemLanguages(), app.getLocale()] as ReadonlyArray<TLocaleId>));

  async function updateAppSettings(partialSettings: Partial<TShowcasesGameSettings>): Promise<TShowcasesGameSettings> {
    const currentSettings: TShowcasesGameSettings = await getAppSettings();
    const newSettings: TShowcasesGameSettings = patchObject(currentSettings, partialSettings);
    await setAppSettings(newSettings);
    console.log('[DESKTOP] Updated app settings');
    return newSettings;
  }

  async function setAppSettings(settings: TShowcasesGameSettings): Promise<void> {
    if (!isSettings(settings)) throw new Error('[DESKTOP] Attempted to save invalid app settings');
    await filesService.writeFile(appSettingsFileName, userDataFolder, JSON.stringify(settings, null, 2));
    console.log(`[DESKTOP] Saved settings file ("${appSettingsFileName}") in : ${userDataFolder}`);
  }

  //Return true if app restart is needed
  function applyPlatformSettings(settings: TShowcasesGameSettings): boolean {
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
    getAppSettings,
    getPreferredLocales,
    setAppSettings,
    updateAppSettings
  };
}
