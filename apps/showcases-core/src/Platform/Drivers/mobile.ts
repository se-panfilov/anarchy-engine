import type { TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';

// TODO MOBILE: Make sure ALL these methods are working correctly
// TODO MOBILE: Implement the mobile driver
export function Driver(): TPlatformDriver {
  function saveAppSettings(settings: TShowcaseGameSettings): Promise<void> {
    console.log('XXX [MOBILE]', 'saveAppSettings', settings);
    return Promise.resolve();
  }

  function loadAppSettings(): Promise<TShowcaseGameSettings> {
    console.log('XXX [MOBILE]', 'loadAppSettings');
    return Promise.resolve({} as any);
  }

  // TODO DESKTOP: fix return type of "loadLegalDocs"
  const loadLegalDocs = (options: TLoadDocPayload): Promise<string> => {
    console.log('XXX [MOBILE]', 'loadLegalDocs', options);
    return Promise.resolve({} as any);
  };

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
    loadLegalDocs,
    getNodeVersion,
    getChromeVersion,
    getPlatformVersion,
    getWrappedAppVersion
  };
}
