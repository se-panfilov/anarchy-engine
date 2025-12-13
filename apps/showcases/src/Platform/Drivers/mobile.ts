import type { TGameSettings } from '@ShowcasesShared';

import type { TPlatformDriver } from '@/Models';

export function Driver(): TPlatformDriver {
  function saveAppSettings(settings: TGameSettings): Promise<void> {
    console.log('XXX [MOBILE]', 'saveAppSettings', settings);
    return Promise.resolve();
  }

  function loadAppSettings(): Promise<TGameSettings> {
    console.log('XXX [MOBILE]', 'loadAppSettings');
    return Promise.resolve({} as any);
  }
  function getNodeVersion(): string {
    console.log('XXX [MOBILE]', 'getNodeVersion');
    return 'XXX [MOBILE] mocked node version';
  }

  function getChromeVersion(): string {
    console.log('XXX [MOBILE]', 'getChromeVersion');
    return 'XXX [MOBILE] mocked chrome version';
  }
  function getPlatformVersion(): string {
    console.log('XXX [MOBILE]', 'getPlatformVersion');
    return 'XXX [MOBILE] mocked platform version';
  }
  function getWrappedAppVersion(): Promise<string> {
    console.log('XXX [MOBILE]', 'getWrappedAppVersion');
    return Promise.resolve('XXX [MOBILE] mocked wrapped app version');
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
