import type { TShowcaseGameSettings } from '@Showcases/Shared';

import type { TSettingsWebDb, TSettingsWebDbService, TWebDbService } from '@/Models';

import { WebDbService } from './WebDbService';

export function SettingsWebDbService(): TSettingsWebDbService {
  const webDb: TWebDbService = WebDbService();
  const dbName: string = 'SettingsWebDb';
  const db: TSettingsWebDb = webDb.createDb(dbName);

  async function readSettings<T = TShowcaseGameSettings>(): Promise<T | null> {
    const row = await kv.get('settings');
    return (row?.value as T) ?? null;
  }

  async function writeSettings<T = TShowcaseGameSettings>(value: T): Promise<void> {
    await kv.put({ key: 'settings', value });
  }

  async function patchSettings<T = TShowcaseGameSettings>(patch: Partial<T>): Promise<T> {
    return db.transaction('rw', kv, async () => {
      const current = (await kv.get('settings'))?.value as T | undefined;
      const next = { ...(current as object), ...(patch as object) } as T;
      await kv.put({ key: 'settings', value: next });
      return next;
    });
  }

  return {
    readSettings,
    writeSettings,
    patchSettings
  };
}
