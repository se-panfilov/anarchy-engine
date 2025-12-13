import type { TKinematicData } from '@/Engine/Kinematic';

import type { TTransformAgentParams } from './TTransformAgentParams';

export type TKinematicTransformAgentParams = TTransformAgentParams &
  TKinematicData &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
