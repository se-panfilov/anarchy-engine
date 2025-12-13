import type { TKinematicData } from '@/Engine/Kinematic';

import type { TTransformDriverParams } from './TTransformDriverParams';

export type TKinematicTransformDriveParams = TTransformDriverParams &
  TKinematicData &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
