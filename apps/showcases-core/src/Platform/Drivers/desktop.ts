import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';
import { platformApiName } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';

// TODO DESKTOP: Make sure ALL these methods are working correctly
export function Driver(): TPlatformDriver {
  const closeApp = (): void => window[platformApiName].closeApp();
  const getChromeVersion = (): string => window[platformApiName].chrome();
  const getNodeVersion = (): string => window[platformApiName].node();
  const getPlatformVersion = (): string => window[platformApiName].electron();
  const getWrappedAppVersion = (): Promise<string> => window[platformApiName].desktopAppVersion();
  const getAppSettings = (): Promise<TShowcaseGameSettings> => window[platformApiName].getAppSettings();
  const getLegalDocs = (options: TLoadDocPayload): Promise<TLegalDoc> => window[platformApiName].getLegalDocs(options);
  const restartApp = (): void => window[platformApiName].restartApp();
  const setFirstRun: (isFirstRun: boolean) => Promise<void> = (isFirstRun: boolean): Promise<void> => window[platformApiName].setFirstRun(isFirstRun);
  const setAppSettings = (settings: TShowcaseGameSettings): Promise<void> => window[platformApiName].setAppSettings(settings);

  return {
    closeApp,
    getChromeVersion,
    getNodeVersion,
    getPlatformVersion,
    getWrappedAppVersion,
    getAppSettings,
    getLegalDocs,
    restartApp,
    setFirstRun,
    setAppSettings
  };
}
