import type { ICameraWrapper } from '@Engine/Wrappers';
import type { IProtectedRegistry } from '@Engine/Models';

export type ICameraRegistry = IProtectedRegistry<ICameraWrapper> &
  Readonly<{
    getByTag: (tag: string) => ICameraWrapper | never;
  }>;
