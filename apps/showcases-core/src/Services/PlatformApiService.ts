import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';
import { Driver } from 'platform:api';

import type { TPlatformApiService, TPlatformDriver } from '@/Models';

export function PlatformApiService(): TPlatformApiService {
  const driver: TPlatformDriver = Driver();

  const closeApp = (): void => driver.closeApp();
  const getChromeVersion = (): string => driver.getChromeVersion();
  const getDriver = (): TPlatformDriver => driver;
  const getNodeVersion = (): string => driver.getNodeVersion();
  const getPlatformVersion = (): string => driver.getPlatformVersion();
  const getWrappedAppVersion = (): Promise<string> => driver.getWrappedAppVersion();
  const loadAppSettings = (): Promise<TShowcaseGameSettings> => driver.loadAppSettings();
  const loadLegalDocs = (options: TLoadDocPayload): Promise<TLegalDoc> => driver.loadLegalDocs(options);
  const restartApp = (args?: ReadonlyArray<string>): void => driver.restartApp(args);
  const saveAppSettings = (settings: TShowcaseGameSettings): Promise<void> => driver.saveAppSettings(settings);

  return {
    closeApp,
    getChromeVersion,
    getDriver,
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
