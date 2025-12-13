import type { TDeepPartial } from '@Anarchy/Shared/Utils';
import { isNotDefined, patchObject } from '@Anarchy/Shared/Utils';
import type { TShowcaseGameSettings } from '@Showcases/Shared';
import { isPartialSettings } from '@Showcases/Shared';

import { SettingsId, SettingsWebDbVersion } from '@/Constants';
import type { TSettingsWebDb, TSettingsWebDbService, TWebDbService } from '@/Models';

import { WebDbService } from './WebDbService';

export function SettingsWebDbService(): TSettingsWebDbService {
  const webDb: TWebDbService = WebDbService();
  const dbName: string = 'SettingsWebDb';
  const db: TSettingsWebDb = webDb.createDb(dbName);
  const id = SettingsId;

  db.version(SettingsWebDbVersion).stores({ settings: '' });
  const table = db.table<TShowcaseGameSettings>('settings');

  async function findSettings(): Promise<TShowcaseGameSettings | undefined> {
    return (await table.get(id)) ?? undefined;
  }

  async function getSettings(): Promise<TShowcaseGameSettings> | never {
    const value: TShowcaseGameSettings | undefined = await findSettings();
    if (isNotDefined(value)) throw new Error(`[APP][SettingsWebDbService]: No settings found in the database "${dbName}"`);
    return value;
  }

  async function setSettings(value: TShowcaseGameSettings): Promise<void> {
    await table.put(value, id);
  }

  async function updateSettings(patch: TDeepPartial<TShowcaseGameSettings>): Promise<void> | never {
    if (!isPartialSettings(patch)) throw new Error('[APP][SettingsWebDbService]: Invalid settings patch, cannot update settings');

    return void db.transaction('rw', table, async (): Promise<TShowcaseGameSettings> | never => {
      const current: TShowcaseGameSettings | undefined = await findSettings();
      if (isNotDefined(current)) throw new Error(`[APP][SettingsWebDbService]: No settings found in the database "${dbName}", cannot update settings`);
      const value: TShowcaseGameSettings = patchObject(current, patch);

      await table.put(value, id);
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
