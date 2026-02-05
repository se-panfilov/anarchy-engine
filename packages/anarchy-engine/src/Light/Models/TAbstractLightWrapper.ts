import type { TWrapper } from '@hellpig/anarchy-engine/Abstract';
import type { LightType } from '@hellpig/anarchy-engine/Light/Constants';
import type { TWithObject3d } from '@hellpig/anarchy-engine/Mixins';
import type { TWithTransformDrive } from '@hellpig/anarchy-engine/TransformDrive';

import type { TAnyLight } from './TAnyLight';
import type { TLightTransformAgents } from './TLightTransformAgents';

export type TAbstractLightWrapper<T extends TAnyLight> = TWrapper<T> &
  TWithObject3d &
  TWithTransformDrive<TLightTransformAgents> &
  Readonly<{
    getType: () => LightType;
  }>;
