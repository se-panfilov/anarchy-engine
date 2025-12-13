import { AllowedSystemFolders } from '@Showcases/Desktop/Constants';
import type { TFilesService, TSettingsService } from '@Showcases/Desktop/Models';
import type { TShowcaseGameSettings } from '@Showcases/Shared';
import { isSettings } from '@Showcases/Shared';

// TODO DESKTOP: Add protection (allowed files list, name/extension checks, sanitization, etc)
export function SettingsService(filesService: TFilesService): TSettingsService {
  const userDataFolder: AllowedSystemFolders = AllowedSystemFolders.UserData;
  const appSettingsFileName: string = 'user-config.json';

  // TODO DESKTOP: rename load/save to read/write

  // TODO DESKTOP: Re-test the case when settings file is not existing (it's fine, do not throw)
  const loadAppSettings = async (): Promise<TShowcaseGameSettings | undefined> => filesService.readFileAsJson(appSettingsFileName, userDataFolder, isSettings);

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
