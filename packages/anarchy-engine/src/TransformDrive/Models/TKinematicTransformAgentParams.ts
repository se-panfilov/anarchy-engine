import type { TKinematicData } from '@Anarchy/Engine/Kinematic';

import type { TTransformAgentParams } from './TTransformAgentParams';

export type TKinematicTransformAgentParams = TTransformAgentParams &
  TKinematicData &
  Readonly<{
    isAutoUpdate: boolean;
  }>;
