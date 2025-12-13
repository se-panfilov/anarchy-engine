import type { TSceneConfig } from '@/Scene';

import type { TSpaceConfigEntities } from './TSpaceConfigEntities';
import type { TSpaceConfigResources } from './TSpaceConfigResources';
import type { TSpaceParams } from './TSpaceParams';

export type TSpaceConfig = Omit<TSpaceParams, 'scenes' | 'entities'> &
  Readonly<{
    scenes: ReadonlyArray<TSceneConfig>;
    entities: TSpaceConfigEntities;
    resources: TSpaceConfigResources;
  }>;
