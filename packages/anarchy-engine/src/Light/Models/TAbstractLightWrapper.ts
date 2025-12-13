import type { TWrapper } from '@Anarchy/Engine/Abstract';
import type { LightType } from '@Anarchy/Engine/Light/Constants';
import type { TWithObject3d } from '@Anarchy/Engine/Mixins';
import type { TWithTransformDrive } from '@Anarchy/Engine/TransformDrive';

import type { TAnyLight } from './TAnyLight';
import type { TLightTransformAgents } from './TLightTransformAgents';

export type TAbstractLightWrapper<T extends TAnyLight> = TWrapper<T> &
  TWithObject3d &
  TWithTransformDrive<TLightTransformAgents> &
  Readonly<{
    getType: () => LightType;
  }>;
