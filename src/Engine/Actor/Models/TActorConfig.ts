import type { TCollisionsDataConfig } from '@/Engine/Collisions';
import type { TKinematicDataConfig } from '@/Engine/Kinematic';
import type { TMaterialPackConfig, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWithPresetNamePhysicsBodyConfig } from '@/Engine/Physics';
import type { TSpatialDataConfig } from '@/Engine/Spatial';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TActorProps } from './TActorProps';

export type TActorConfig = Omit<TActorProps, 'material'> &
  Readonly<{
    material: TMaterialPackConfig<TMaterialTexturePack>;
    // TODO check name match model's in config
    model3dName?: string;
  }> &
  Readonly<{
    physics?: TWithPresetNamePhysicsBodyConfig;
  }> &
  Readonly<{
    kinematic?: TKinematicDataConfig;
  }> &
  Readonly<{
    spatial: TSpatialDataConfig;
  }> &
  Readonly<{
    collisions?: TCollisionsDataConfig;
  }> &
  TObject3DPropConfig &
  TWithReadonlyTags;
