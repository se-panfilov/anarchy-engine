import type { TShowcaseGameSettings } from '@Showcases/Shared';
import { platformApiName } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';

export function Driver(): TPlatformDriver {
  const saveAppSettings = (settings: TShowcaseGameSettings): Promise<void> => window[platformApiName].saveAppSettings(settings);
  const loadAppSettings = (): Promise<TShowcaseGameSettings> => window[platformApiName].loadAppSettings();
  // TODO DESKTOP: fix return type of "loadLegalDocs"
  const loadLegalDocs = (): Promise<string> => window[platformApiName].loadLegalDocs();
  const getNodeVersion = (): string => window[platformApiName].node();
  const getChromeVersion = (): string => window[platformApiName].chrome();
  const getPlatformVersion = (): string => window[platformApiName].electron();
  const getWrappedAppVersion = (): Promise<string> => window[platformApiName].desktopAppVersion();

  return {
    saveAppSettings,
    loadAppSettings,
    getNodeVersion,
    getChromeVersion,
    getPlatformVersion,
    getWrappedAppVersion
  };
}
