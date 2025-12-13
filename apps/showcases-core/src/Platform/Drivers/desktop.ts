import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';
import { platformApiName } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';

// TODO DESKTOP: Make sure ALL these methods are working correctly
export function Driver(): TPlatformDriver {
  const getChromeVersion = (): string => window[platformApiName].chrome();
  const getNodeVersion = (): string => window[platformApiName].node();
  const getPlatformVersion = (): string => window[platformApiName].electron();
  const getWrappedAppVersion = (): Promise<string> => window[platformApiName].desktopAppVersion();
  const loadAppSettings = (): Promise<TShowcaseGameSettings> => window[platformApiName].loadAppSettings();
  const loadLegalDocs = (options: TLoadDocPayload): Promise<TLegalDoc> => window[platformApiName].loadLegalDocs(options);
  const saveAppSettings = (settings: TShowcaseGameSettings): Promise<void> => window[platformApiName].saveAppSettings(settings);

  return {
    getChromeVersion,
    getNodeVersion,
    getPlatformVersion,
    getWrappedAppVersion,
    loadAppSettings,
    loadLegalDocs,
    saveAppSettings
  };
}
