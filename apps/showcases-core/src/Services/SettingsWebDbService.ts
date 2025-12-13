import type { TDeepPartial } from '@Anarchy/Shared/Utils';
import { isNotDefined, patchObject } from '@Anarchy/Shared/Utils';
import type { TShowcaseGameSettings } from '@Showcases/Shared';
import { isPartialSettings } from '@Showcases/Shared';

import type { TSettingsRow, TSettingsWebDb, TSettingsWebDbService, TWebDbService } from '@/Models';

import { WebDbService } from './WebDbService';

export const SettingsWebDbVersion = 1 as const;
export const schemaVersion = 1 as const;

// Just a convention, meaning "there is only one row" (for other entities, e.g. "save games", multiple rows might be needed)
export const id: TSettingsRow['id'] = 'singleton';

export function SettingsWebDbService(): TSettingsWebDbService {
  const webDb: TWebDbService = WebDbService();
  const dbName: string = 'SettingsWebDb';
  const db: TSettingsWebDb = webDb.createDb(dbName);

  db.version(SettingsWebDbVersion).stores({ settings: 'id' });
  const table = db.table<TSettingsRow, TSettingsRow['id']>('settings');

  async function findSettings(): Promise<TShowcaseGameSettings | undefined> {
    const row: TSettingsRow | undefined = await table.get(id);
    return row?.value ?? undefined;
  }

  async function getSettings(): Promise<TShowcaseGameSettings> | never {
    const value: TShowcaseGameSettings | undefined = await findSettings();
    if (isNotDefined(value)) throw new Error(`[APP][SettingsWebDbService]: No settings found in the database "${dbName}"`);
    return value;
  }

  async function setSettings(value: TShowcaseGameSettings): Promise<void> {
    await table.put({ id, value, schemaVersion });
  }

  async function updateSettings(patch: TDeepPartial<TShowcaseGameSettings>): Promise<TShowcaseGameSettings> | never {
    if (!isPartialSettings(patch)) throw new Error('[APP][SettingsWebDbService]: Invalid settings patch, cannot update settings');

    return db.transaction('rw', table, async (): Promise<TShowcaseGameSettings> | never => {
      const current: TShowcaseGameSettings | undefined = await findSettings();
      if (isNotDefined(current)) throw new Error(`[APP][SettingsWebDbService]: No settings found in the database "${dbName}", cannot update settings`);
      const value: TShowcaseGameSettings = patchObject(current, patch);

      await table.put({ id, value, schemaVersion });
      return value;
    });
  }

  return {
    findSettings,
    getSettings,
    setSettings,
    updateSettings
  };
}

export const settingsWebDbService: TSettingsWebDbService = SettingsWebDbService();
