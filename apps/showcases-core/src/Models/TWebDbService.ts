import type Dexie from 'dexie';

export type TWebDbStorageInfo = Readonly<{ quota?: number; usage?: number; type: 'indexDB' }>;

export type TWebDbService = Readonly<{
  createDb: <T>(name: string) => Dexie & T;
  deleteDb: (name: string) => Promise<void>;
  tryIncreaseStorageSpace: () => Promise<boolean>;
  getInfo: () => Promise<TWebDbStorageInfo>;
}>;
