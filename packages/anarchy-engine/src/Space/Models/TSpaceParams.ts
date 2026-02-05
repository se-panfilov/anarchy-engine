import type { TWithName, TWithTags } from '@hellpig/anarchy-engine/Mixins';
import type { TSceneParams } from '@hellpig/anarchy-engine/Scene';
import type { SpaceSchemaVersion } from '@hellpig/anarchy-engine/Space/Constants';

import type { TSpaceParamsEntities } from './TSpaceParamsEntities';

export type TSpaceParams = Readonly<{
  canvasSelector: string;
  version: SpaceSchemaVersion;
  scenes: ReadonlyArray<TSceneParams>;
  entities?: TSpaceParamsEntities;
}> &
  TWithName &
  TWithTags;
