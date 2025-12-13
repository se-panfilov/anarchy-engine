import { Driver } from 'platform:api';

import type { TPlatformApiService, TPlatformDriver } from '@/Models';

export function PlatformApiService(): TPlatformApiService {
  const driver: TPlatformDriver = Driver();

  const { closeApp, getAppSettings, getBrowserInfo, getLegalDocs, getNodeVersion, getPlatformVersion, getPreferredLocales, getWrappedAppVersion, restartApp, setAppSettings, setFirstRun } = driver;

  return {
    closeApp,
    getAppSettings,
    getBrowserInfo,
    getDriver: (): TPlatformDriver => driver,
    getLegalDocs,
    getNodeVersion,
    getPlatformVersion,
    getPreferredLocales,
    getWrappedAppVersion,
    restartApp,
    setAppSettings,
    setFirstRun
  };
}

export const platformApiService: TPlatformApiService = PlatformApiService();
