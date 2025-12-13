import type { TPlatformDriver } from './TPlatformDriver';

export type TPlatformApiService = TPlatformDriver &
  Readonly<{
    getDriver: () => TPlatformDriver;
  }>;
