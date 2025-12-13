import type { TWithName, TWithTags } from '@Engine/Mixins';
import type { TSceneParams } from '@Engine/Scene';
import type { SpaceSchemaVersion } from '@Engine/Space/Constants';

import type { TSpaceFlags } from './TSpaceFlags';
import type { TSpaceParamsEntities } from './TSpaceParamsEntities';
import type { TSpaceSettings } from './TSpaceSettings';

export type TSpaceParams = Readonly<{
  canvasSelector: string;
  version: SpaceSchemaVersion;
  scenes: ReadonlyArray<TSceneParams>;
  entities?: TSpaceParamsEntities;
  // TODO 18-0-0: serialize options (save/load)
  settings?: TSpaceSettings;
  // TODO 18-0-0: Either remove flags from params, or serialize flags (save/load)
  flags?: TSpaceFlags;
}> &
  TWithName &
  TWithTags;
