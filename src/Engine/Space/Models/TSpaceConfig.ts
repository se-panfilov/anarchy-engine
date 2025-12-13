import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TSceneConfig } from '@/Engine/Scene';
import type { SpaceSchemaVersion } from '@/Engine/Space/Constants';

import type { TSpaceConfigEntities } from './TSpaceConfigEntities';
import type { TSpaceConfigResources } from './TSpaceConfigResources';

// TODO CWP split config into resources and entities
// TODO CWP preload all (async)resources before entities
// TODO CWP save configs into config registries
// TODO CWP use config registries to implement creation with overrides

export type TSpaceConfig = Readonly<{
  name: string;
  version: SpaceSchemaVersion;
  scenes: ReadonlyArray<TSceneConfig>;
  entities: TSpaceConfigEntities;
  resources: TSpaceConfigResources;
}> &
  TWithReadonlyTags;
