import type { TLegalDoc, TLoadDocPayload, TShowcaseGameSettings } from '@Showcases/Shared';

import type { TPlatformDriver } from '@/Models';

// TODO DESKTOP: Make sure ALL these methods are working correctly
// TODO DESKTOP: Implement the web driver
export function Driver(): TPlatformDriver {
  function closeApp(): void {
    throw new Error('[WEB] closeApp is not supported on this platform');
  }

  function getChromeVersion(): string {
    console.log('XXX [WEB]', 'getChromeVersion');
    return 'XXX [WEB] mocked chrome version';
  }

  function getNodeVersion(): string {
    console.log('XXX [WEB]', 'getNodeVersion');
    return 'XXX [WEB] mocked node version';
  }

  function getPlatformVersion(): string {
    console.log('XXX [WEB]', 'getPlatformVersion');
    return 'XXX [WEB] mocked platform version';
  }

  function getWrappedAppVersion(): Promise<string> {
    console.log('XXX [WEB]', 'getWrappedAppVersion');
    return Promise.resolve('XXX [WEB] mocked wrapped app version');
  }

  function readAppSettings(): Promise<TShowcaseGameSettings> {
    console.log('XXX [WEB]', 'readAppSettings');
    return Promise.resolve({} as any);
  }

  async function loadLegalDocs({ name }: TLoadDocPayload): Promise<TLegalDoc> {
    const legalFolder: string = `${import.meta.env.BASE_URL}legal/`; // /public/legal/ and /legal are the same here
    const originBase: string = `${window.location.origin}${legalFolder}`;
    const response: Response = await fetch(`${originBase}${name}.md`);

    if (!response.ok) throw new Error(`Failed to load legal doc "${name}" from ${response.url}: ${response.status} ${response.statusText}`);
    const result: string = await response.text();
    // TODO DESKTOP: sanitize result here
    return { name, content: result };
  }

  function restartApp(): void {
    console.log('XXX [WEB]', 'restartApp');
  }

  function setFirstRun(isFirstRun: boolean): Promise<void> {
    console.log('XXX [WEB]', 'setFirstRun', isFirstRun);
    return Promise.resolve();
  }

  function writeAppSettings(settings: TShowcaseGameSettings): Promise<void> {
    console.log('XXX [WEB]', 'writeAppSettings', settings);
    return Promise.resolve();
  }

  return {
    closeApp,
    getChromeVersion,
    getNodeVersion,
    getPlatformVersion,
    getWrappedAppVersion,
    readAppSettings,
    loadLegalDocs,
    restartApp,
    setFirstRun,
    writeAppSettings
  };
}
