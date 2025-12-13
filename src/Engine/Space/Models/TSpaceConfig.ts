import type { TSceneConfig } from '@/Engine/Scene';

import type { TSpaceConfigEntities } from './TSpaceConfigEntities';
import type { TSpaceConfigResources } from './TSpaceConfigResources';
import type { TSpaceParams } from './TSpaceParams';

export type TSpaceConfig = Omit<TSpaceParams, 'canvas' | 'scenes' | 'entities'> &
  Readonly<{
    canvasSource: string;
    scenes: ReadonlyArray<TSceneConfig>;
    entities: TSpaceConfigEntities;
    resources: TSpaceConfigResources;
  }>;
