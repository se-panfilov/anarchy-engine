import type { TCollisionsDataConfig } from '@hellpig/anarchy-engine/Collisions';
import type { TKinematicConfig } from '@hellpig/anarchy-engine/Kinematic';
import type { TSpatialDataConfig } from '@hellpig/anarchy-engine/Spatial';
import type { TObject3DPropConfig } from '@hellpig/anarchy-engine/ThreeLib';

import type { TActorModel3dSettingsConfig } from './TActorModel3dSettingsConfig';
import type { TActorParams } from './TActorParams';
import type { TActorStatesConfig } from './TActorStatesConfig';

export type TActorConfig = Omit<TActorParams, 'model3dSettings' | 'model3dSource' | 'physicsBody' | 'kinematic' | 'spatial' | 'collisions' | 'states' | 'position' | 'rotation' | 'scale'> &
  Readonly<{
    collisions?: TCollisionsDataConfig;
    kinematic?: TKinematicConfig;
    model3dSettings?: TActorModel3dSettingsConfig;
    model3dSource: string;
    physicsBodyName?: string;
    spatial: TSpatialDataConfig;
    states?: TActorStatesConfig;
  }> &
  Pick<TObject3DPropConfig, 'position' | 'rotation' | 'scale'>;
