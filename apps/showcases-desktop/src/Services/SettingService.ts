import * as fs from 'node:fs';

import { AllowedSystemFolders } from '@Showcases/Desktop/Constants';
import type { TFilesService, TSettingsService } from '@Showcases/Desktop/Models';
import type { TShowcaseGameSettings } from '@Showcases/Shared';
import { isSettings } from '@Showcases/Shared';

// TODO DESKTOP: Add protection (allowed files list, name/extension checks, sanitization, etc)
export function SettingsService(filesService: TFilesService): TSettingsService {
  const userDataFolder: AllowedSystemFolders = AllowedSystemFolders.UserData;
  const appSettingsFileName: string = 'user-config.json';

  // TODO DESKTOP: rename load/save to read/write
  // TODO DESKTOP: What should happen when no settings? Return values from desktop?
  //  Use defaults from the main app? (or send partial settings, what were detected by the desktop app)
  const loadAppSettings = async (): Promise<TShowcaseGameSettings | undefined> => {
    if (!fs.existsSync(filesService.getPathToFile(appSettingsFileName, userDataFolder))) {
      console.log(`[DESKTOP]: Settings file ("${appSettingsFileName}") not found in : ${userDataFolder}`);
      return undefined;
    }
    return filesService.readFileAsJson(appSettingsFileName, userDataFolder, isSettings);
  };

  async function saveAppSettings(settings: TShowcaseGameSettings): Promise<void> {
    if (!isSettings(settings)) throw new Error('[DESKTOP]: Attempted to save invalid app settings');
    await filesService.writeFile(appSettingsFileName, userDataFolder, JSON.stringify(settings, null, 2));
    console.log(`[DESKTOP]: Saved settings file ("${appSettingsFileName}") in : ${userDataFolder}`);
  }

  return {
    loadAppSettings,
    saveAppSettings
  };
}
