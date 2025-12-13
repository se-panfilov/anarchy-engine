import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';
import { platformApiName } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';

// TODO DESKTOP: Make sure ALL these methods are working correctly
export function Driver(): TPlatformDriver {
  const saveAppSettings = (settings: TShowcaseGameSettings): Promise<void> => window[platformApiName].saveAppSettings(settings);
  const loadAppSettings = (): Promise<TShowcaseGameSettings> => window[platformApiName].loadAppSettings();
  const loadLegalDocs = (options: TLoadDocPayload): Promise<TLegalDoc> => window[platformApiName].loadLegalDocs(options);
  const getNodeVersion = (): string => window[platformApiName].node();
  const getChromeVersion = (): string => window[platformApiName].chrome();
  const getPlatformVersion = (): string => window[platformApiName].electron();
  const getWrappedAppVersion = (): Promise<string> => window[platformApiName].desktopAppVersion();

  return {
    saveAppSettings,
    loadAppSettings,
    loadLegalDocs,
    getNodeVersion,
    getChromeVersion,
    getPlatformVersion,
    getWrappedAppVersion
  };
}
