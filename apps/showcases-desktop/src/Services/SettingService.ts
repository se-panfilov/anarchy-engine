import * as fs from 'node:fs';

import { AllowedFolders } from '@Desktop/Constants';
import type { TSettingsService } from '@Desktop/Models';
import type { TShowcaseGameSettings } from '@ShowcasesShared';
import type { App } from 'electron';
import { join } from 'path';

const userDataFolder: AllowedFolders = AllowedFolders.UserData;
const appSettingsFileName: string = 'user-config.json';

export function SettingsService(app: App): TSettingsService {
  function loadAppSettings(): TShowcaseGameSettings | undefined {
    try {
      const settingsFile: string = join(app.getPath(userDataFolder), appSettingsFileName);
      const raw: string = fs.readFileSync(settingsFile, 'utf-8');
      return JSON.parse(raw);
    } catch {
      // TODO DESKTOP: Handle error (log it, show dialog, etc.)
      return undefined;
    }
  }

  function saveAppSettings(settings: TShowcaseGameSettings): void {
    const settingsFile: string = join(app.getPath(userDataFolder), appSettingsFileName);
    fs.writeFileSync(settingsFile, JSON.stringify(settings, null, 2), 'utf-8');
  }

  return {
    loadAppSettings,
    saveAppSettings
  };
}
