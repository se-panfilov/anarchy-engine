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
  const readAppSettings = (): Promise<TShowcaseGameSettings> => window[platformApiName].readAppSettings();
  const loadLegalDocs = (options: TLoadDocPayload): Promise<TLegalDoc> => window[platformApiName].loadLegalDocs(options);
  const restartApp = (): void => window[platformApiName].restartApp();
  const writeAppSettings = (settings: TShowcaseGameSettings): Promise<void> => window[platformApiName].writeAppSettings(settings);

  return {
    closeApp,
    getChromeVersion,
    getNodeVersion,
    getPlatformVersion,
    getWrappedAppVersion,
    readAppSettings,
    loadLegalDocs,
    restartApp,
    writeAppSettings
  };
}
