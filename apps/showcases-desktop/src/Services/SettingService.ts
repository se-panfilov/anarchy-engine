import * as fs from 'node:fs';

import type { TResolution } from '@ShowcasesShared';
import type { App } from 'electron';
import { join } from 'path';

type TDesktopAppSettings = Readonly<{ screen: TScreenSettings }>;
type TScreenSettings = Readonly<{
  resolution: TResolution;
  fullscreen: boolean;
}>;

type TAllowedFolders =
  | 'home'
  | 'appData'
  | 'userData'
  | 'sessionData'
  | 'temp'
  | 'exe'
  | 'module'
  | 'desktop'
  | 'documents'
  | 'downloads'
  | 'music'
  | 'pictures'
  | 'videos'
  | 'recent'
  | 'logs'
  | 'crashDumps';
const userDataFolder: TAllowedFolders = 'userData';
const appSettingsFileName: string = 'user-config.json';

export type TSettingsService = Readonly<{
  loadAppSettings: () => TDesktopAppSettings | undefined;
  saveAppSettings: (settings: TDesktopAppSettings) => void;
}>;

export function SettingsService(app: App): TSettingsService {
  function loadAppSettings(): TDesktopAppSettings | undefined {
    try {
      const settingsFile: string = join(app.getPath(userDataFolder), appSettingsFileName);
      const raw: string = fs.readFileSync(settingsFile, 'utf-8');
      return JSON.parse(raw);
    } catch {
      // TODO DESKTOP: Handle error (log it, show dialog, etc.)
      return undefined;
    }
  }

  function saveAppSettings(settings: TDesktopAppSettings): void {
    const settingsFile: string = join(app.getPath(userDataFolder), appSettingsFileName);
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), 'utf-8');
  }

  return {
    loadAppSettings,
    saveAppSettings
  };
}
