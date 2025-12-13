import type { TAppCanvas } from '@/Engine/App';
import type { TWithName, TWithTags } from '@/Engine/Mixins';
import type { TSceneConfig } from '@/Engine/Scene';
import type { SpaceSchemaVersion } from '@/Engine/Space/Constants';

import type { TSpaceHooks } from './TSpaceHooks';
import type { TSpaceParamsEntities } from './TSpaceParamsEntities';
import type { TSpaceParamsResources } from './TSpaceParamsResources';

export type TSpaceParams = Readonly<{
  version: SpaceSchemaVersion;
  canvas: TAppCanvas;
  hooks?: TSpaceHooks;
  entities: TSpaceParamsEntities;
  resources: TSpaceParamsResources;
  scenes: ReadonlyArray<TSceneConfig>;
}> &
  TWithName &
  TWithTags;
