import type { TShowcaseGameSettings } from '@ShowcasesShared';

import type { TPlatformDriver } from '@/Models';

export function Driver(): TPlatformDriver {
  const saveAppSettings = (settings: TShowcaseGameSettings): Promise<void> => window.platformApi.saveAppSettings(settings);
  const loadAppSettings = (): Promise<TShowcaseGameSettings> => window.platformApi.loadAppSettings();
  const getNodeVersion = (): string => window.platformApi.node();
  const getChromeVersion = (): string => window.platformApi.chrome();
  const getPlatformVersion = (): string => window.platformApi.electron();
  const getWrappedAppVersion = (): Promise<string> => window.platformApi.desktopAppVersion();

  return {
    saveAppSettings,
    loadAppSettings,
    getNodeVersion,
    getChromeVersion,
    getPlatformVersion,
    getWrappedAppVersion
  };
}
