import type { IDestroyablePool } from '@Engine/Domains/Mixins';
import type { ISceneWrapper } from '@Engine/Domains/Scene';

import type { IRegistries } from './IRegistries';

export type IRegistryPool = IDestroyablePool<IRegistries> &
  Readonly<{
    startAddSubscription: (scene: Readonly<ISceneWrapper>) => void;
  }>;
