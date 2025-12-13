import type { TSceneConfig } from '@/Engine/Scene';

import type { TSpaceConfigEntities } from './TSpaceConfigEntities';
import type { TSpaceConfigResources } from './TSpaceConfigResources';
import type { TSpaceParams } from './TSpaceParams';

export type TSpaceConfig = Omit<TSpaceParams, 'canvas' | 'hooks' | 'scenes' | 'entities' | 'resources'> &
  Readonly<{
    scenes: ReadonlyArray<TSceneConfig>;
    entities: TSpaceConfigEntities;
    resources: TSpaceConfigResources;
  }>;
