import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';

// TODO MOBILE: Make sure ALL these methods are working correctly
// TODO MOBILE: Implement the mobile driver
export function Driver(): TPlatformDriver {
  function closeApp(): void {
    throw new Error('[MOBILE] closeApp is not supported on this platform');
  }

  function getChromeVersion(): string {
    console.log('XXX [MOBILE]', 'getChromeVersion');
    return 'XXX [MOBILE] mocked chrome version';
  }

  function getNodeVersion(): string {
    console.log('XXX [MOBILE]', 'getNodeVersion');
    return 'XXX [MOBILE] mocked node version';
  }

  function getPlatformVersion(): string {
    console.log('XXX [MOBILE]', 'getPlatformVersion');
    return 'XXX [MOBILE] mocked platform version';
  }

  function getWrappedAppVersion(): Promise<string> {
    console.log('XXX [MOBILE]', 'getWrappedAppVersion');
    return Promise.resolve('XXX [MOBILE] mocked wrapped app version');
  }

  function getAppSettings(): Promise<TShowcaseGameSettings> {
    console.log('XXX [MOBILE]', 'getAppSettings');
    return Promise.resolve({} as any);
  }

  const getLegalDocs = (options: TLoadDocPayload): Promise<TLegalDoc> => {
    console.log('XXX [MOBILE]', 'getLegalDocs', options);
    return Promise.resolve({} as any);
  };

  function restartApp(): void {
    console.log('XXX [MOBILE]', 'restartApp');
  }

  function setFirstRun(isFirstRun: boolean): Promise<void> {
    console.log('XXX [MOBILE]', 'setFirstRun', isFirstRun);
    return Promise.resolve();
  }

  function setAppSettings(settings: TShowcaseGameSettings): Promise<void> {
    console.log('XXX [MOBILE]', 'setAppSettings', settings);
    return Promise.resolve();
  }

  return {
    closeApp,
    getChromeVersion,
    getNodeVersion,
    getPlatformVersion,
    getWrappedAppVersion,
    getAppSettings,
    getLegalDocs,
    restartApp,
    setFirstRun,
    setAppSettings
  };
}
