import type { TGameSettings } from '@ShowcasesShared';

import type { TPlatformApiService } from '@/Models';

export function WebDriver(): TPlatformApiService {
  function saveAppSettings(settings: TGameSettings): Promise<void> {
    console.log('XXX [WEB]', 'saveAppSettings', settings);
    return Promise.resolve();
  }

  function loadAppSettings(): Promise<TGameSettings> {
    console.log('XXX [WEB]', 'loadAppSettings');
    return Promise.resolve({} as any);
  }
  function getNodeVersion(): string {
    console.log('XXX [WEB]', 'getNodeVersion');
    return 'XXX [WEB] mocked node version';
  }

  function getChromeVersion(): string {
    console.log('XXX [WEB]', 'getChromeVersion');
    return 'XXX [WEB] mocked chrome version';
  }
  function getPlatformVersion(): string {
    console.log('XXX [WEB]', 'getPlatformVersion');
    return 'XXX [WEB] mocked platform version';
  }
  function getWrappedAppVersion(): Promise<string> {
    console.log('XXX [WEB]', 'getWrappedAppVersion');
    return Promise.resolve('XXX [WEB] mocked wrapped app version');
  }

  return {
    saveAppSettings,
    loadAppSettings,
    getNodeVersion,
    getChromeVersion,
    getPlatformVersion,
    getWrappedAppVersion
  };
}
