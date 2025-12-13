import type { TCollisionsDataConfig } from '@/Engine/Collisions';
import type { TKinematicDataConfig } from '@/Engine/Kinematic';
import type { TMaterialPackConfig, TMaterialTexturePack } from '@/Engine/MaterialTexturePack';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TModel3dConfig } from '@/Engine/Models3d';
import type { TWithPresetNamePhysicsBodyConfig } from '@/Engine/Physics';
import type { TSpatialDataConfig } from '@/Engine/Spatial';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TActorProps } from './TActorProps';

export type TActorConfig = Omit<TActorProps, 'material'> &
  Readonly<{
    material: TMaterialPackConfig<TMaterialTexturePack>;
    model3d: TModel3dConfig;
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
