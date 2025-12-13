import type { TShowcaseGameSettings } from '@Showcases/Shared';
import { Driver } from 'platform:api';

import type { TPlatformApiService, TPlatformDriver } from '@/Models';

export function PlatformApiService(): TPlatformApiService {
  const driver: TPlatformDriver = Driver();

  const saveAppSettings = (settings: TShowcaseGameSettings): Promise<void> => driver.saveAppSettings(settings);
  const loadAppSettings = (): Promise<TShowcaseGameSettings> => driver.loadAppSettings();
  // TODO DESKTOP: fix return type of "loadLegalDocs"
  const loadLegalDocs = (): Promise<string> => driver.loadLegalDocs();
  const getNodeVersion = (): string => driver.getNodeVersion();
  const getChromeVersion = (): string => driver.getChromeVersion();
  const getPlatformVersion = (): string => driver.getPlatformVersion();
  const getWrappedAppVersion = (): Promise<string> => driver.getWrappedAppVersion();
  const getDriver = (): TPlatformDriver => driver;

  return {
    saveAppSettings,
    loadAppSettings,
    loadLegalDocs,
    getNodeVersion,
    getChromeVersion,
    getPlatformVersion,
    getWrappedAppVersion,
    getDriver
  };
}

export const platformApiService: TPlatformApiService = PlatformApiService();
