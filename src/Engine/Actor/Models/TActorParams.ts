import type { TCollisionsDataParams } from '@/Engine/Collisions';
import type { TKinematicParams } from '@/Engine/Kinematic';
import type { TModel3d } from '@/Engine/Models3d';
import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import type { TSpatialDataParams } from '@/Engine/Spatial';
import type { TObject3DParams } from '@/Engine/ThreeLib';
import type { TOptional } from '@/Engine/Utils';

import type { TActorProps } from './TActorProps';

export type TActorParams = TActorProps &
  Readonly<{
    model3dSource: TModel3d;
    physics?: TWithPresetNamePhysicsBodyParams;
    kinematic?: TOptional<TKinematicParams>;
    spatial: TSpatialDataParams;
    collisions?: TCollisionsDataParams;
  }> &
  // TODO 8.0.0. MODELS: do we need scale?
  Pick<TObject3DParams, 'position' | 'rotation' | 'scale'>;
