import type { TDeepPartial } from '@Anarchy/Shared/Utils';
import type { TShowcaseGameSettings } from '@Showcases/Shared';
import type { Dexie, EntityTable } from 'dexie';

export type TSettingsWebDbService = Readonly<{
  findSettings: () => Promise<TShowcaseGameSettings | undefined>;
  getSettings: () => Promise<TShowcaseGameSettings> | never;
  setSettings: (value: TShowcaseGameSettings) => Promise<void>;
  updateSettings: (patch: TDeepPartial<TShowcaseGameSettings>) => Promise<TShowcaseGameSettings> | never;
}>;

export type TSettingsRow = Readonly<{
  id: 'singleton';
  value: TShowcaseGameSettings;
  schemaVersion: number;
}>;

export type TSettingsWebDb = Dexie & Readonly<{ settings: EntityTable<TSettingsRow, 'id'> }>;
