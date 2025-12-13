import type { TGameSettings } from '@ShowcasesShared';
import { Driver } from 'platform:api';

import type { TPlatformApiService, TPlatformDriver } from '@/Models';

export function PlatformApiService(): TPlatformApiService {
  const driver: TPlatformDriver = Driver();

  function saveAppSettings(settings: TGameSettings): Promise<void> {
    return driver.saveAppSettings(settings);
  }

  function loadAppSettings(): Promise<TGameSettings> {
    return driver.loadAppSettings();
  }

  function getNodeVersion(): string {
    return driver.getNodeVersion();
  }

  function getChromeVersion(): string {
    return driver.getChromeVersion();
  }

  function getPlatformVersion(): string {
    return driver.getPlatformVersion();
  }

  function getWrappedAppVersion(): Promise<string> {
    return driver.getWrappedAppVersion();
  }

  const getDriver = (): TPlatformDriver => driver;

  return {
    saveAppSettings,
    loadAppSettings,
    getNodeVersion,
    getChromeVersion,
    getPlatformVersion,
    getWrappedAppVersion,
    getDriver
  };
}
