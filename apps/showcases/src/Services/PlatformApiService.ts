import type { TGameSettings } from '@ShowcasesShared';

import type { TPlatformApiService } from '@/Models';

export function PlatformApiService(): TPlatformApiService {
  function saveAppSettings(settings: TGameSettings): Promise<void> {
    return Promise.resolve();
  }

  function loadAppSettings(): Promise<TGameSettings> {
    return Promise.resolve({});
  }
  function getNodeVersion(): string {
    return process.versions.node;
  }

  function getChromeVersion(): string {
    return process.versions.chrome;
  }
  function getPlatformVersion(): string {
    return process.versions.electron;
  }
  function getWrappedAppVersion(): Promise<string> {
    return Promise.resolve(__DESKTOP_APP_VERSION__);
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
