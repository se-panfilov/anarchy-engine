import type { TCollisionsDataConfig } from '@/Engine/Collisions';
import type { TKinematicConfig } from '@/Engine/Kinematic';
import type { TWithPresetNamePhysicsBodyConfig } from '@/Engine/Physics';
import type { TSpatialDataConfig } from '@/Engine/Spatial';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TActorModel3dSettingsConfig } from './TActorModel3dSettingsConfig';
import type { TActorProps } from './TActorProps';
import type { TActorStatesConfig } from './TActorStatesConfig';

export type TActorConfig = Omit<TActorProps, 'model3dSettings'> &
  Readonly<{
    model3dSource: string;
    physics?: TWithPresetNamePhysicsBodyConfig;
    kinematic?: TKinematicConfig;
    spatial: TSpatialDataConfig;
    collisions?: TCollisionsDataConfig;
    model3dSettings?: TActorModel3dSettingsConfig;
    states?: TActorStatesConfig;
  }> &
  Pick<TObject3DPropConfig, 'position' | 'rotation' | 'scale'>;
