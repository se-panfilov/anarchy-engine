import type { TWithName, TWithTags } from '@Engine/Mixins';
import type { TSceneParams } from '@Engine/Scene';
import type { SpaceSchemaVersion } from '@Engine/Space/Constants';

import type { TSpaceParamsEntities } from './TSpaceParamsEntities';

export type TSpaceParams = Readonly<{
  canvasSelector: string;
  version: SpaceSchemaVersion;
  scenes: ReadonlyArray<TSceneParams>;
  entities?: TSpaceParamsEntities;
}> &
  TWithName &
  TWithTags;
