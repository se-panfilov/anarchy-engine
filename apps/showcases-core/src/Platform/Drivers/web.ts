import type { TLocale, TLocaleId } from '@Anarchy/i18n';
import { getLocaleByLocaleId, getPreferLocaleId, stringToLocaleId } from '@Anarchy/i18n';
import { isDefined } from '@Anarchy/Shared/Utils';
import { ShowcasesFallbackLocale, ShowcasesLocales } from '@Showcases/i18n';
import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';
import { DefaultShowcaseGameSettings } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';
import { settingsWebDbService } from '@/Services';

// TODO DESKTOP: Make sure ALL these methods are working correctly
// TODO DESKTOP: Implement the web driver
export function Driver(): TPlatformDriver {
  function closeApp(): void {
    throw new Error('[WEB] closeApp is not supported on this platform');
  }

  // TODO DESKTOP: implement this
  function getBrowserVersion(): string {
    const userAgent = navigator.userAgent;
    const chromeMatch = userAgent.match(/Chrome\/([0-9.]+)/);
    return chromeMatch ? chromeMatch[1] : 'Chrome not detected';
  }

  const getNodeVersion = (): string => 'N/A';

  const getPlatformVersion = (): string => 'N/A';

  function getWrappedAppVersion(): Promise<string> {
    console.log('XXX [WEB]', 'getWrappedAppVersion');
    return Promise.resolve('XXX [WEB] mocked wrapped app version');
  }

  async function getAppSettings(): Promise<TShowcaseGameSettings> {
    const settings: TShowcaseGameSettings | undefined = await settingsWebDbService.findSettings();
    if (isDefined(settings)) return settings;

    console.warn(`[WEB] Settings not found. Applying default settings.`);
    const defaultSettings: TShowcaseGameSettings = await buildDefaultSettings();
    await setAppSettings(defaultSettings);
    return defaultSettings;
  }

  function getPreferredLocales(): Promise<ReadonlyArray<TLocaleId>> {
    const navigatorLanguages: ReadonlyArray<string> = Array.isArray(navigator.languages) ? navigator.languages : [];
    const languages: ReadonlyArray<string> = isDefined(navigator.language) ? [navigator.language, ...navigatorLanguages] : navigatorLanguages;
    return Promise.resolve(Array.from(new Set(languages.map(stringToLocaleId))));
  }

  async function buildDefaultSettings(): Promise<TShowcaseGameSettings> {
    const availableLocales: ReadonlyArray<TLocale> = Object.values(ShowcasesLocales);
    const availableLocalesIds: ReadonlyArray<TLocaleId> = availableLocales.map((locale: TLocale): TLocaleId => locale.id);
    const locale: TLocale = getLocaleByLocaleId(getPreferLocaleId(await getPreferredLocales(), availableLocalesIds, ShowcasesFallbackLocale.id), availableLocales);

    const platformDetectedSettings: Partial<TShowcaseGameSettings> = {
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

  async function getLegalDocs({ name }: TLoadDocPayload): Promise<TLegalDoc> {
    const legalFolder: string = `${import.meta.env.BASE_URL}legal/`; // /public/legal/ and /legal are the same here
    const originBase: string = `${window.location.origin}${legalFolder}`;
    const response: Response = await fetch(`${originBase}${name}.md`);

    if (!response.ok) throw new Error(`Failed to load legal doc "${name}" from ${response.url}: ${response.status} ${response.statusText}`);
    const result: string = await response.text();
    // TODO DESKTOP: sanitize result here
    return { name, content: result };
  }

  const restartApp = (): void => window.location.reload();

  const setFirstRun = (isFirstRun: boolean): Promise<void> => settingsWebDbService.updateSettings({ internal: { isFirstRun } });

  async function setAppSettings(settings: TShowcaseGameSettings): Promise<void> {
    return settingsWebDbService.setSettings(settings);
  }

  return {
    closeApp,
    getAppSettings,
    getBrowserVersion,
    getLegalDocs,
    getNodeVersion,
    getPlatformVersion,
    getPreferredLocales,
    getWrappedAppVersion,
    restartApp,
    setAppSettings,
    setFirstRun
  };
}
