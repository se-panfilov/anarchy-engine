import type { TCollisionsDataParams } from '@/Engine/Collisions';
import type { TKinematicDataParams } from '@/Engine/Kinematic';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TModel3dParams } from '@/Engine/Models3d';
import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import type { TSpatialDataParams } from '@/Engine/Spatial';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TActorProps } from './TActorProps';

export type TActorParams = TActorProps &
  Readonly<{
    model3d: TModel3dParams;
  }> &
  TObject3DParams &
  Readonly<{
    physics?: TWithPresetNamePhysicsBodyParams;
  }> &
  Readonly<{
    kinematic?: TKinematicDataParams;
  }> &
  Readonly<{
    spatial: TSpatialDataParams;
  }> &
  Readonly<{
    collisions?: TCollisionsDataParams;
  }> &
  TWithReadonlyTags;
