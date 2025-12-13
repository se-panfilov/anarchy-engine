import type { TLocale, TLocaleId } from '@Anarchy/i18n';
import { getLocaleByLocaleId, getPreferLocaleId, stringToLocaleId } from '@Anarchy/i18n';
import { buildPublicUrl, isDefined } from '@Anarchy/Shared/Utils';
import { getBrowserInfo } from '@Anarchy/Shared/Utils/DetectUtils';
import { ShowcasesFallbackLocale, ShowcasesLocales } from '@Showcases/i18n';
import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';
import { DefaultShowcaseGameSettings, sanitizeMarkDown } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';
import { settingsWebDbService } from '@/Services/SettingsWebDbService';

export function Driver(): TPlatformDriver {
  function closeApp(): void {
    throw new Error('[WEB] closeApp is not supported on this platform');
  }

  const getNodeVersion = (): string => 'N/A';

  const getPlatformVersion = (): string => import.meta.env.__APP_VERSION__;

  const getWrappedAppVersion = (): Promise<string> => Promise.resolve('N/A');

  const getPackagesVersions = (): Promise<Record<string, string>> => Promise.resolve(__BUILD_META_INFO__);

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
    const response: Response = await fetch(`${buildPublicUrl(import.meta.env.BASE_URL, 'legal')}/${name}.md`);

    if (!response.ok) throw new Error(`Failed to load legal doc "${name}" from ${response.url}: ${response.status} ${response.statusText}`);
    const content: string = await response.text();
    const cleanContent: string = await sanitizeMarkDown(content);
    return { name, content: cleanContent };
  }

  const restartApp = (): void => window.location.reload();

  const setFirstRun = (isFirstRun: boolean): Promise<void> => settingsWebDbService.updateSettings({ internal: { isFirstRun } });

  async function setAppSettings(settings: TShowcaseGameSettings): Promise<void> {
    return settingsWebDbService.setSettings(settings);
  }

  return {
    closeApp,
    getAppSettings,
    getBrowserInfo,
    getLegalDocs,
    getNodeVersion,
    getPackagesVersions,
    getPlatformVersion,
    getPreferredLocales,
    getWrappedAppVersion,
    restartApp,
    setAppSettings,
    setFirstRun
  };
}
