import type { TLocaleId } from '@Anarchy/i18n';
import type { TBrowserInfo } from '@Anarchy/Shared/Models';
import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';
import { platformApiName } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';

export function Driver(): TPlatformDriver {
  const closeApp = (): void => window[platformApiName].closeApp();
  const getAppSettings = (): Promise<TShowcaseGameSettings> => window[platformApiName].getAppSettings();
  const getBrowserInfo = (): TBrowserInfo => window[platformApiName].getBrowserInfo();
  const getLegalDocs = (options: TLoadDocPayload): Promise<TLegalDoc> => window[platformApiName].getLegalDocs(options);
  const getNodeVersion = (): string => window[platformApiName].node();
  const getPackagesVersions = (): Promise<Record<string, string>> => window[platformApiName].getPackagesVersions();
  const getPlatformVersion = (): string => window[platformApiName].electron();
  const getPreferredLocales = (): Promise<ReadonlyArray<TLocaleId>> => window[platformApiName].getPreferredLocales();
  const getReleaseName = (version: string): Promise<string> => window[platformApiName].getReleaseName(version);
  const getWrappedAppVersion = (): Promise<string> => window[platformApiName].desktopAppVersion();
  const restartApp = (): void => window[platformApiName].restartApp();
  const setAppSettings = (settings: TShowcaseGameSettings): Promise<void> => window[platformApiName].setAppSettings(settings);
  const setFirstRun: (isFirstRun: boolean) => Promise<void> = (isFirstRun: boolean): Promise<void> => window[platformApiName].setFirstRun(isFirstRun);

  return {
    closeApp,
    getAppSettings,
    getBrowserInfo,
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
