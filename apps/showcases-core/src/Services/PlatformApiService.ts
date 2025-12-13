import { Driver } from 'platform:api';

import type { TPlatformApiService, TPlatformDriver } from '@/Models';

export function PlatformApiService(): TPlatformApiService {
  const driver: TPlatformDriver = Driver();

  const { closeApp, getChromeVersion, getNodeVersion, getPlatformVersion, getWrappedAppVersion, getAppSettings, getLegalDocs, restartApp, setFirstRun, setAppSettings } = driver;

  return {
    closeApp,
    getChromeVersion,
    getDriver: (): TPlatformDriver => driver,
    getNodeVersion,
    getPlatformVersion,
    getWrappedAppVersion,
    getLegalDocs,
    getAppSettings,
    restartApp,
    setFirstRun,
    setAppSettings
  };
}

export const platformApiService: TPlatformApiService = PlatformApiService();
