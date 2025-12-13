import type { TGameSettings } from '@ShowcasesShared';

import type { TPlatformApiService } from '@/Models';

export function DesktopDriver(): TPlatformApiService {
  function saveAppSettings(settings: TGameSettings): Promise<void> {
    console.log('XXX [DESKTOP]', 'saveAppSettings', settings);
    return Promise.resolve();
  }

  function loadAppSettings(): Promise<TGameSettings> {
    console.log('XXX [DESKTOP]', 'loadAppSettings');
    return Promise.resolve({} as any);
  }
  function getNodeVersion(): string {
    console.log('XXX [DESKTOP]', 'getNodeVersion');
    return 'XXX [DESKTOP] mocked node version';
  }

  function getChromeVersion(): string {
    console.log('XXX [DESKTOP]', 'getChromeVersion');
    return 'XXX [DESKTOP] mocked chrome version';
  }
  function getPlatformVersion(): string {
    console.log('XXX [DESKTOP]', 'getPlatformVersion');
    return 'XXX [DESKTOP] mocked platform version';
  }
  function getWrappedAppVersion(): Promise<string> {
    console.log('XXX [DESKTOP]', 'getWrappedAppVersion');
    return Promise.resolve('XXX [DESKTOP] mocked wrapped app version');
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
