import Dexie from 'dexie';

import type { TWebDbService, TWebDbStorageInfo } from '@/Models';

export function WebDbService(): TWebDbService {
  function createDb<T>(name: string): Dexie & T {
    tryIncreaseStorageSpace();
    return new Dexie(name) as Dexie & T;
  }

  function deleteDb(name: string): Promise<void> {
    return Dexie.delete(name);
  }

  async function tryIncreaseStorageSpace(): Promise<boolean> {
    // Persistent Storage API — increases the chance that the browser will not clear the storage
    try {
      const granted: boolean = (await navigator.storage?.persist?.()) ?? false;
      console.log('[APP][WebDbService] persistent storage granted');
      return granted;
    } catch (e) {
      console.warn('[APP][WebDbService] persistent storage is NOT granted', e);
      return false;
    }
  }

  async function getInfo(): Promise<TWebDbStorageInfo> {
    const estimate: StorageEstimate = await navigator.storage?.estimate?.();
    return { quota: estimate?.quota, usage: estimate?.usage, isPersisted: (await navigator.storage?.persisted?.()) ?? false, type: 'indexDB' };
  }

  return {
    createDb,
    deleteDb,
    tryIncreaseStorageSpace,
    getInfo
  };
}
