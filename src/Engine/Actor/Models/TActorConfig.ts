import type { TCollisionsDataConfig } from '@/Engine/Collisions';
import type { TKinematicDataConfig } from '@/Engine/Kinematic';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TWithPresetNamePhysicsBodyConfig } from '@/Engine/Physics';
import type { TSpatialDataConfig } from '@/Engine/Spatial';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TActorProps } from './TActorProps';

export type TActorConfig = TActorProps &
  Readonly<{
    // TODO 8.0.0. MODELS: check name match model's in config
    model3dSource: string;
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
  Pick<TObject3DPropConfig, 'position' | 'rotation' | 'scale'> &
  TWithReadonlyTags;
