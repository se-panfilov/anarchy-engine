import type { TCollisionsDataConfig } from '@/Engine/Collisions';
import type { TKinematicDataConfig } from '@/Engine/Kinematic';
import type { TWithReadonlyTags } from '@/Engine/Mixins';
import type { TModel3dConfig } from '@/Engine/Models3d';
import type { TWithPresetNamePhysicsBodyConfig } from '@/Engine/Physics';
import type { TSpatialDataConfig } from '@/Engine/Spatial';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';
import type { TOptional } from '@/Engine/Utils';

import type { TActorProps } from './TActorProps';

export type TActorConfig = TActorProps &
  Readonly<{
    // TODO CWP check name match model's in config
    // TODO CWP allow to override model3d preset's params here in config
    model3d?: Readonly<{
      presetName: string;
    }> &
      TOptional<TModel3dConfig>;
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
