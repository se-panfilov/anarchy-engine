import type { TWithName, TWithTags } from '@Anarchy/Engine/Mixins';
import type { TSceneParams } from '@Anarchy/Engine/Scene';
import type { SpaceSchemaVersion } from '@Anarchy/Engine/Space/Constants';

import type { TSpaceParamsEntities } from './TSpaceParamsEntities';

export type TSpaceParams = Readonly<{
  canvasSelector: string;
  version: SpaceSchemaVersion;
  scenes: ReadonlyArray<TSceneParams>;
  entities?: TSpaceParamsEntities;
}> &
  TWithName &
  TWithTags;
