import type { TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';

// TODO DESKTOP: Make sure ALL these methods are working correctly
// TODO DESKTOP: Implement the web driver
export function Driver(): TPlatformDriver {
  function saveAppSettings(settings: TShowcaseGameSettings): Promise<void> {
    console.log('XXX [WEB]', 'saveAppSettings', settings);
    return Promise.resolve();
  }

  function loadAppSettings(): Promise<TShowcaseGameSettings> {
    console.log('XXX [WEB]', 'loadAppSettings');
    return Promise.resolve({} as any);
  }

  // TODO DESKTOP: make sure this method is working
  // TODO DESKTOP: fix return type of "loadLegalDocs"
  const loadLegalDocs = (options: TLoadDocPayload): Promise<string> => {
    console.log('XXX [WEB]', 'loadLegalDocs', options);
    return Promise.resolve({} as any);
  };

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
    loadLegalDocs,
    getNodeVersion,
    getChromeVersion,
    getPlatformVersion,
    getWrappedAppVersion
  };
}
