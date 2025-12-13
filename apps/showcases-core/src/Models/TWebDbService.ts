import type Dexie from 'dexie';

export type TWebDbService = Readonly<{
  createDb: <T>(name: string) => Dexie & T;
  deleteDb: (name: string) => Promise<void>;
  isDbExists: (name: string) => Promise<boolean>;
}>;
