import type { TCollisionsDataConfig } from '@/Engine/Collisions';
import type { TKinematicConfig } from '@/Engine/Kinematic';
import type { TPhysicsBodyConfig } from '@/Engine/Physics';
import type { TSpatialDataConfig } from '@/Engine/Spatial';
import type { TObject3DPropConfig } from '@/Engine/ThreeLib';

import type { TActorModel3dSettingsConfig } from './TActorModel3dSettingsConfig';
import type { TActorParams } from './TActorParams';
import type { TActorStatesConfig } from './TActorStatesConfig';

export type TActorConfig = Omit<TActorParams, 'model3dSettings' | 'model3dSource' | 'physics' | 'kinematic' | 'spatial' | 'collisions' | 'states' | 'position' | 'rotation' | 'scale'> &
  Readonly<{
    model3dSource: string;
    physics?: TPhysicsBodyConfig;
    kinematic?: TKinematicConfig;
    spatial: TSpatialDataConfig;
    collisions?: TCollisionsDataConfig;
    model3dSettings?: TActorModel3dSettingsConfig;
    states?: TActorStatesConfig;
  }> &
  Pick<TObject3DPropConfig, 'position' | 'rotation' | 'scale'>;
