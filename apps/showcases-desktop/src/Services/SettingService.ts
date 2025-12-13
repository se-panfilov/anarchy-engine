import * as fs from 'node:fs';
import * as path from 'node:path';

import { AllowedFolders } from '@Desktop/Constants';
import type { TSettingsService } from '@Desktop/Models';
import { isAllNotDefined, isNotDefined } from '@Shared/Utils';
import type { TShowcaseGameSettings } from '@ShowcasesShared';
import type { App } from 'electron';

export function SettingsService(app: App): TSettingsService {
  const userDataFolder: AllowedFolders = AllowedFolders.UserData;
  const appSettingsFileName: string = 'user-config.json';

  function settingsFilePath(): string {
    const folder: string = app.getPath(userDataFolder);
    return path.join(folder, appSettingsFileName);
  }

  function loadAppSettings(): TShowcaseGameSettings | never {
    const filePath: string = settingsFilePath();
    if (!fs.existsSync(filePath)) throw new Error(`[DESKTOP]: Settings file does not exist: ${filePath}`);
    const raw: string = fs.readFileSync(filePath, 'utf-8');
    const parsed: unknown = JSON.parse(raw);
    if (isSettings(parsed)) return parsed;
    throw new Error(`[DESKTOP]: Invalid settings file structure in: "${filePath}"`);
  }

  function saveAppSettings(settings: TShowcaseGameSettings): void {
    if (!isSettings(settings)) throw new Error('[DESKTOP]: Attempted to save invalid app settings');

    const finalPath: string = settingsFilePath();
    const dir: string = path.dirname(finalPath);
    const tmpPath: string = `${finalPath}.tmp`;

    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const data: string = JSON.stringify(settings, null, 2);
    fs.writeFileSync(tmpPath, data, { encoding: 'utf-8' });
    fs.renameSync(tmpPath, finalPath);

    console.log('[DESKTOP]: settings saved:', finalPath);
  }

  function isSettings(settings: TShowcaseGameSettings | unknown): settings is TShowcaseGameSettings {
    if (isNotDefined(settings)) return false;
    if (typeof settings !== 'object') return false;
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
