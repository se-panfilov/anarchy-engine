import type { TAppCanvas } from '@/Engine/App';
import type { TWithName, TWithTags } from '@/Engine/Mixins';
import type { TSceneParams } from '@/Engine/Scene';
import type { SpaceSchemaVersion } from '@/Engine/Space/Constants';

import type { TSpaceParamsEntities } from './TSpaceParamsEntities';

export type TSpaceParams = Readonly<{
  version: SpaceSchemaVersion;
  canvas: TAppCanvas;
  entities: TSpaceParamsEntities;
  scenes: ReadonlyArray<TSceneParams>;
}> &
  TWithName &
  TWithTags;
