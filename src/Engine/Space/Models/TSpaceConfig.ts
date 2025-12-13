import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TSceneConfig } from '@/Engine/Scene';
import type { SpaceSchemaVersion } from '@/Engine/Space/Constants';

import type { TSpaceConfigEntities } from './TSpaceConfigEntities';
import type { TSpaceConfigResources } from './TSpaceConfigResources';

// TODO 9.0.0. RESOURCES: use config registries to implement creation with overrides (or maybe no need in overrides, just create a new instance of a resource)

export type TSpaceConfig = Readonly<{
  name: string;
  version: SpaceSchemaVersion;
  scenes: ReadonlyArray<TSceneConfig>;
  entities: TSpaceConfigEntities;
  resources: TSpaceConfigResources;
}> &
  TWithReadonlyTags;
