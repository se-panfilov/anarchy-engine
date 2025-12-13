import { Driver } from 'platform:api';

import type { TPlatformApiService, TPlatformDriver } from '@/Models';

export function PlatformApiService(): TPlatformApiService {
  const driver: TPlatformDriver = Driver();

  const { closeApp, getChromeVersion, getNodeVersion, getPlatformVersion, getWrappedAppVersion, loadAppSettings, loadLegalDocs, restartApp, saveAppSettings } = driver;

  return {
    closeApp,
    getChromeVersion,
    getDriver: (): TPlatformDriver => driver,
    getNodeVersion,
    getPlatformVersion,
    getWrappedAppVersion,
    loadAppSettings,
    loadLegalDocs,
    restartApp,
    saveAppSettings
  };
}

export const platformApiService: TPlatformApiService = PlatformApiService();
