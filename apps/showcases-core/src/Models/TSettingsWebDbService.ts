import type { TDeepPartial } from '@Anarchy/Shared/Utils';
import type { TShowcasesGameSettings } from '@Showcases/Shared';
import type { Dexie, EntityTable } from 'dexie';

export type TSettingsWebDbService = Readonly<{
  findSettings: () => Promise<TShowcasesGameSettings | undefined>;
  getSettings: () => Promise<TShowcasesGameSettings> | never;
  setSettings: (value: TShowcasesGameSettings) => Promise<void>;
  updateSettings: (patch: TDeepPartial<TShowcasesGameSettings>) => Promise<void> | never;
}>;

export type TSettingsWebDb = Dexie & Readonly<{ settings: EntityTable<TShowcasesGameSettings> }>;
