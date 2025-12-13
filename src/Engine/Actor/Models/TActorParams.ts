import type { TCollisionsDataParams } from '@/Engine/Collisions';
import type { TKinematicDataParams } from '@/Engine/Kinematic';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TModel3dFacade } from '@/Engine/Models3d';
import type { TWithPresetNamePhysicsBodyParams } from '@/Engine/Physics';
import type { TSpatialDataParams } from '@/Engine/Spatial';
import type { TObject3DParams } from '@/Engine/ThreeLib';

import type { TActorProps } from './TActorProps';

export type TActorParams = TActorProps &
  Readonly<{
    model3dSource: TModel3dFacade;
  }> &
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
  Pick<TObject3DParams, 'position' | 'rotation' | 'scale'> &
  TWithReadonlyTags;
