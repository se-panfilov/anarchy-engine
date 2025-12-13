import Dexie from 'dexie';

import type { TWebDbService } from '@/Models';

export function WebDbService(): TWebDbService {
  function createDb<T>(name: string): Dexie & T {
    const db: Dexie = new Dexie(name);

    db.version(1).stores({
      kv: 'key',
      saves: 'slot, updatedAt'
    });
  }

  async function persist(): Promise<boolean> {
    // Persistent Storage API — increases the chance that the browser will not clear the storage
    try {
      return (await navigator.storage?.persist?.()) ?? false;
    } catch {
      return false;
    }
  }

  async function info(): Promise<TStorageInfo> {
    const est = await navigator.storage?.estimate?.();
    return { quota: est?.quota, usage: est?.usage, backend: 'dexie-idb' as const };
  }

  return {
    createDb
  };
}
