import type { IProtectedRegistry } from '@Engine/Models';
import type { ICameraWrapper } from '@Engine/Wrappers';

export type ICameraRegistry = IProtectedRegistry<ICameraWrapper> &
  Readonly<{
    getByTag: (tag: string) => ICameraWrapper | never;
  }>;
