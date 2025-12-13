import type { TLocaleId } from '@Anarchy/i18n';
import type { TBrowserInfo } from '@Anarchy/Shared/Models';
import type { TDistName, TLegalDoc, TLoadDocPayload, TReleaseName, TShowcaseGameSettings } from '@Showcases/Shared';
import { makeDistName, makeReleaseName } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';

// TODO MOBILE: Make sure ALL these methods are working correctly
// TODO MOBILE: Implement the mobile driver
export function Driver(): TPlatformDriver {
  let cachedAppSettings: TShowcaseGameSettings | undefined;

  function closeApp(): void {
    throw new Error('[MOBILE] closeApp is not supported on this platform');
  }

  function getBrowserInfo(): TBrowserInfo {
    console.log('TODO [MOBILE]', 'getBrowserInfo');
    return {} as TBrowserInfo;
  }

  const getCachedAppSettings = (): TShowcaseGameSettings | undefined => cachedAppSettings;

  function getDistName(): Promise<TDistName> {
    console.log('TODO [MOBILE]', 'getDistName');
    return Promise.resolve(makeDistName('mobile', 'todo'));
  }

  function getNodeVersion(): string {
    console.log('TODO [MOBILE]', 'getNodeVersion');
    return 'TODO [MOBILE] mocked node version';
  }

  function getPlatformVersion(): string {
    console.log('TODO [MOBILE]', 'getPlatformVersion');
    return 'TODO [MOBILE] mocked platform version';
  }

  function getWrappedAppVersion(): Promise<string> {
    console.log('TODO [MOBILE]', 'getWrappedAppVersion');
    return Promise.resolve('TODO [MOBILE] mocked wrapped app version');
  }

  function getAppSettings(): Promise<TShowcaseGameSettings> {
    // TODO UPDATE cachedAppSettings
    console.log('TODO [MOBILE]', 'getAppSettings');
    return Promise.resolve({} as any);
  }

  const getLegalDocs = (options: TLoadDocPayload): Promise<TLegalDoc> => {
    // TODO MOBILE: sanitize result here
    console.log('TODO [MOBILE]', 'getLegalDocs', options);
    return Promise.resolve({} as any);
  };

  function restartApp(): void {
    console.log('TODO [MOBILE]', 'restartApp');
  }

  function setFirstRun(isFirstRun: boolean): Promise<void> {
    console.log('TODO [MOBILE]', 'setFirstRun', isFirstRun);
    return Promise.resolve();
  }

  function setAppSettings(settings: TShowcaseGameSettings): Promise<void> {
    // TODO UPDATE cachedAppSettings
    console.log('TODO [MOBILE]', 'setAppSettings', settings);
    return Promise.resolve();
  }

  function getPreferredLocales(): Promise<ReadonlyArray<TLocaleId>> {
    console.log('TODO [MOBILE]', 'getPreferredLocales');
    return Promise.resolve({} as any);
  }

  function getReleaseName(): Promise<TReleaseName> {
    console.log('TODO [MOBILE]', 'getReleaseName');
    return Promise.resolve(makeReleaseName('showcases-mobile', 'todo'));
  }

  function getPackagesVersions(): Promise<Record<string, string>> {
    console.log('TODO [MOBILE]', 'getPackagesVersions');
    return Promise.resolve({} as any);
  }

  return {
    closeApp,
    getAppSettings,
    getBrowserInfo,
    getCachedAppSettings,
    getDistName,
    getLegalDocs,
    getNodeVersion,
    getPackagesVersions,
    getPlatformVersion,
    getPreferredLocales,
    getReleaseName,
    getWrappedAppVersion,
    restartApp,
    setAppSettings,
    setFirstRun
  };
}
