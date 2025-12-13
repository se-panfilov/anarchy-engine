import type { IDestroyablePool } from '@Engine/Pool';
import type { ISceneWrapper } from '@Engine/Wrappers';

import type { IRegistries } from './IRegistries';

export type IRegistryPool = IDestroyablePool<IRegistries> &
  Readonly<{
    startAddSubscription: (scene: Readonly<ISceneWrapper>) => void;
  }>;
