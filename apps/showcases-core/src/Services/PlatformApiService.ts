import { Driver } from 'platform:api';

import type { TPlatformApiService, TPlatformDriver } from '@/Models';

export function PlatformApiService(): TPlatformApiService {
  const driver: TPlatformDriver = Driver();

  const { closeApp, getChromeVersion, getNodeVersion, getPlatformVersion, getWrappedAppVersion, readAppSettings, loadLegalDocs, restartApp, setFirstRun, writeAppSettings } = driver;

  return {
    closeApp,
    getChromeVersion,
    getDriver: (): TPlatformDriver => driver,
    getNodeVersion,
    getPlatformVersion,
    getWrappedAppVersion,
    loadLegalDocs,
    readAppSettings,
    restartApp,
    setFirstRun,
    writeAppSettings
  };
}

export const platformApiService: TPlatformApiService = PlatformApiService();
