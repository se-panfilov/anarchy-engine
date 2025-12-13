import type { TWithName, TWithReadonlyTags } from '@/Engine/Mixins';
import type { TSceneConfig } from '@/Engine/Scene';
import type { SpaceSchemaVersion } from '@/Engine/Space/Constants';

import type { TSpaceConfigEntities } from './TSpaceConfigEntities';
import type { TSpaceConfigResources } from './TSpaceConfigResources';

export type TSpaceConfig = Readonly<{
  version: SpaceSchemaVersion;
  scenes: ReadonlyArray<TSceneConfig>;
  entities: TSpaceConfigEntities;
  resources: TSpaceConfigResources;
}> &
  TWithName &
  TWithReadonlyTags;
