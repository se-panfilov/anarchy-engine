import type { TLocaleId } from '@Anarchy/i18n';
import type { TBrowserInfo } from '@Anarchy/Shared/Models';
import type { TDistName, TLegalDoc, TLoadDocPayload, TReleaseName, TShowcasesGameSettings } from '@Showcases/Shared';
import { platformApiName } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';

export function Driver(): TPlatformDriver {
  let cachedAppSettings: TShowcasesGameSettings | undefined;

  const closeApp = (): void => window[platformApiName].closeApp();
  const getAppSettings = (): Promise<TShowcasesGameSettings> => {
    const settingsPromise: Promise<TShowcasesGameSettings> = window[platformApiName].getAppSettings();
    settingsPromise.then((settings: TShowcasesGameSettings) => (cachedAppSettings = settings));
    return settingsPromise;
  };
  const getBrowserInfo = (): TBrowserInfo => window[platformApiName].getBrowserInfo();
  const getCachedAppSettings = (): TShowcasesGameSettings | undefined => cachedAppSettings;
  const getDistName = (): Promise<TDistName> => window[platformApiName].getDistName();
  const getLegalDocs = (options: TLoadDocPayload): Promise<TLegalDoc> => window[platformApiName].getLegalDocs(options);
  const getNodeVersion = (): string => window[platformApiName].node();
  const getPackagesVersions = (): Promise<Record<string, string>> => window[platformApiName].getPackagesVersions();
  const getPlatformVersion = (): string => window[platformApiName].electron();
  const getPreferredLocales = (): Promise<ReadonlyArray<TLocaleId>> => window[platformApiName].getPreferredLocales();
  const getReleaseName = (): Promise<TReleaseName> => window[platformApiName].getReleaseName();
  const getWrappedAppVersion = (): Promise<string> => window[platformApiName].desktopAppVersion();
  const restartApp = (): void => window[platformApiName].restartApp();
  const setAppSettings = (settings: TShowcasesGameSettings): Promise<void> => {
    cachedAppSettings = settings;
    return window[platformApiName].setAppSettings(settings);
  };
  const setFirstRun: (isFirstRun: boolean) => Promise<void> = (isFirstRun: boolean): Promise<void> => window[platformApiName].setFirstRun(isFirstRun);

  return {
    closeApp,
    getAppSettings,
    getBrowserInfo,
    getCachedAppSettings,
    getDistName,
    getLegalDocs,
    getNodeVersion,
    getPackagesVersions,
    getPlatformVersion,
    getPreferredLocales,
    getReleaseName,
    getWrappedAppVersion,
    restartApp,
    setAppSettings,
    setFirstRun
  };
}
