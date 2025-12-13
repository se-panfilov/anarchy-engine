import type { TWithName, TWithTags } from '@/Mixins';
import type { TSceneParams } from '@/Scene';
import type { SpaceSchemaVersion } from '@/Space/Constants';

import type { TSpaceParamsEntities } from './TSpaceParamsEntities';

export type TSpaceParams = Readonly<{
  canvasSelector: string;
  version: SpaceSchemaVersion;
  scenes: ReadonlyArray<TSceneParams>;
  entities?: TSpaceParamsEntities;
}> &
  TWithName &
  TWithTags;
