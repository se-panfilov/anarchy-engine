import type { ActorType } from '@/Engine/Actor/Constants';
import type { TCollisionsDataConfig } from '@/Engine/Collisions';
import type { TKinematicData } from '@/Engine/Kinematic';
import type { TMaterialPackConfig, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWithPresetNamePhysicsBodyConfig } from '@/Engine/Physics';
import type { TSpatialDataConfig } from '@/Engine/Spatial';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';
import type { TOptional } from '@/Engine/Utils';

import type { TActorProps } from './TActorProps';

export type TKinematicDataConfig = TOptional<TKinematicData>;

export type TActorConfig = Omit<TActorProps, 'material'> &
  Readonly<{
    material: TMaterialPackConfig<TMaterialTexturePack>;
    type: ActorType;
    castShadow: boolean;
  }> &
  Readonly<{
    physics?: TWithPresetNamePhysicsBodyConfig;
  }> &
  Readonly<{
    kinematic?: TKinematicDataConfig;
    isKinematicAutoUpdate?: boolean;
  }> &
  Readonly<{
    spatial?: TSpatialDataConfig;
    isSpatialAutoUpdate?: boolean;
  }> &
  Readonly<{
    collisions?: TCollisionsDataConfig;
    isCollisionsAutoUpdate?: boolean;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
