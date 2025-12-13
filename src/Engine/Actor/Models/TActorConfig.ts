import type { TCollisionsDataConfig } from '@/Engine/Collisions';
import type { TKinematicConfig } from '@/Engine/Kinematic';
import type { TWithPresetNamePhysicsBodyConfig } from '@/Engine/Physics';
import type { TSpatialDataConfig } from '@/Engine/Spatial';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TActorModel3dSettingsConfig } from './TActorModel3dSettingsConfig';
import type { TActorProps } from './TActorProps';

export type TActorConfig = Omit<TActorProps, 'model3dSettings'> &
  Readonly<{
    // TODO 8.0.0. MODELS: check name match model's in config
    model3dSource: string;
    physics?: TWithPresetNamePhysicsBodyConfig;
    kinematic?: TKinematicConfig;
    spatial: TSpatialDataConfig;
    collisions?: TCollisionsDataConfig;
    model3dSettings?: TActorModel3dSettingsConfig;
  }> &
  Pick<TObject3DPropConfig, 'position' | 'rotation' | 'scale'>;
