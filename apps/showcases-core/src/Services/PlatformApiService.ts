import { Driver } from 'platform:api';

import type { TPlatformApiService, TPlatformDriver } from '@/Models';

export function PlatformApiService(): TPlatformApiService {
  const driver: TPlatformDriver = Driver();

  const { closeApp, getAppSettings, getBrowserVersion, getLegalDocs, getNodeVersion, getPlatformVersion, getPreferredLocales, getWrappedAppVersion, restartApp, setAppSettings, setFirstRun } = driver;

  return {
    closeApp,
    getAppSettings,
    getBrowserVersion,
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
