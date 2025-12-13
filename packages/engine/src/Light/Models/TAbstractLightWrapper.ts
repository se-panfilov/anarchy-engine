import type { TWrapper } from '@Engine/Abstract';
import type { LightType } from '@Engine/Light/Constants';
import type { TWithObject3d } from '@Engine/Mixins';
import type { TWithTransformDrive } from '@Engine/TransformDrive';

import type { TAnyLight } from './TAnyLight';
import type { TLightTransformAgents } from './TLightTransformAgents';

export type TAbstractLightWrapper<T extends TAnyLight> = TWrapper<T> &
  TWithObject3d &
  TWithTransformDrive<TLightTransformAgents> &
  Readonly<{
    getType: () => LightType;
  }>;
