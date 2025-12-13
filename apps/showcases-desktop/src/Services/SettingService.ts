import * as fs from 'node:fs';

import { AllowedFolders } from '@Desktop/Constants';
import type { TSettingsService } from '@Desktop/Models';
import type { TShowcaseGameSettings } from '@ShowcasesShared';
import { isAllNotDefined, isNotDefined } from 'anarchy_engine/src';
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

  function isSettings(settings: TShowcaseGameSettings | unknown): settings is TShowcaseGameSettings {
    if (isNotDefined(settings)) return false;
    if (typeof settings === 'object') return false;
    const { graphics, localization, debug, internal, audio } = settings as TShowcaseGameSettings;
    if (isAllNotDefined([graphics, audio, localization, debug, internal])) return false;

    return true;
  }

  return {
    loadAppSettings,
    saveAppSettings,
    isSettings
  };
}
