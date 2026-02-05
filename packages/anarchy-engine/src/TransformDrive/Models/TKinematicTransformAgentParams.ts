import type { TKinematicData } from '@hellpig/anarchy-engine/Kinematic';

import type { TTransformAgentParams } from './TTransformAgentParams';

export type TKinematicTransformAgentParams = TTransformAgentParams &
  TKinematicData &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
