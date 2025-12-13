import type { TWithName, TWithTags } from '@/Engine/Mixins';
import type { TSceneParams } from '@/Engine/Scene';
import type { TSpaceCanvas } from '@/Engine/Space';
import type { SpaceSchemaVersion } from '@/Engine/Space/Constants';

import type { TSpaceParamsEntities } from './TSpaceParamsEntities';

export type TSpaceParams = Readonly<{
  version: SpaceSchemaVersion;
  canvas: TSpaceCanvas;
  scenes: ReadonlyArray<TSceneParams>;
  entities?: TSpaceParamsEntities;
}> &
  TWithName &
  TWithTags;
