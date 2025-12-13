import type { TLocaleId } from '@Anarchy/i18n';
import type { TBrowserInfo } from '@Anarchy/Shared/Models';
import type { TDistName, TLegalDoc, TLoadDocPayload, TReleaseName, TShowcaseGameSettings } from '@Showcases/Shared';
import { platformApiName } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';

export function Driver(): TPlatformDriver {
  let cachedAppSettings: TShowcaseGameSettings | undefined;

  const closeApp = (): void => window[platformApiName].closeApp();
  const getAppSettings = (): Promise<TShowcaseGameSettings> => {
    const settingsPromise: Promise<TShowcaseGameSettings> = window[platformApiName].getAppSettings();
    settingsPromise.then((settings: TShowcaseGameSettings) => (cachedAppSettings = settings));
    return settingsPromise;
  };
  const getBrowserInfo = (): TBrowserInfo => window[platformApiName].getBrowserInfo();
  const getCachedAppSettings = (): TShowcaseGameSettings | undefined => cachedAppSettings;
  const getDistName = (): Promise<TDistName> => window[platformApiName].getDistName();
  const getLegalDocs = (options: TLoadDocPayload): Promise<TLegalDoc> => window[platformApiName].getLegalDocs(options);
  const getNodeVersion = (): string => window[platformApiName].node();
  const getPackagesVersions = (): Promise<Record<string, string>> => window[platformApiName].getPackagesVersions();
  const getPlatformVersion = (): string => window[platformApiName].electron();
  const getPreferredLocales = (): Promise<ReadonlyArray<TLocaleId>> => window[platformApiName].getPreferredLocales();
  const getReleaseName = (): Promise<TReleaseName> => window[platformApiName].getReleaseName();
  const getWrappedAppVersion = (): Promise<string> => window[platformApiName].desktopAppVersion();
  const restartApp = (): void => window[platformApiName].restartApp();
  const setAppSettings = (settings: TShowcaseGameSettings): Promise<void> => {
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
