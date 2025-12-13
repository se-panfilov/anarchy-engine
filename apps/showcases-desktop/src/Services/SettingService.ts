import * as fs from 'node:fs';
import * as path from 'node:path';

import { AllowedFolders } from '@Showcases/Desktop/Constants';
import type { TSettingsService } from '@Showcases/Desktop/Models';
import type { TShowcaseGameSettings } from '@Showcases/Shared';
import { isSettings } from '@Showcases/Shared';
import type { App } from 'electron';

// TODO DESKTOP: Add protection (allowed files list, name/extension checks, sanitization, etc)
export function SettingsService(app: App): TSettingsService {
  const userDataFolder: AllowedFolders = AllowedFolders.UserData;
  const appSettingsFileName: string = 'user-config.json';

  function settingsFilePath(): string {
    const folder: string = app.getPath(userDataFolder);
    return path.join(folder, appSettingsFileName);
  }

  // TODO DESKTOP: Extract file reading/writing to a separate utility
  // TODO DESKTOP: Better to make all of this async
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

  return {
    loadAppSettings,
    saveAppSettings
  };
}
