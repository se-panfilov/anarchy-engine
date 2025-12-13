import type { TShowcaseGameSettings } from '@Showcases/Shared';
import type Dexie from 'dexie';

export type TSettingsWebDbService = Readonly<{
  readSettings: <T = TShowcaseGameSettings>() => Promise<T | null>;
  writeSettings: <T = TShowcaseGameSettings>(value: T) => Promise<void>;
  patchSettings: <T = TShowcaseGameSettings>(patch: Partial<T>) => Promise<T>;
}>;

export type TSettingsWebDb = Dexie &
  Readonly<{
    some: string;
  }>;
