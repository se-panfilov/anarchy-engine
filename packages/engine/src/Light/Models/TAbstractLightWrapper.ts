import type { TWrapper } from '@/Abstract';
import type { LightType } from '@/Light/Constants';
import type { TWithObject3d } from '@/Mixins';
import type { TWithTransformDrive } from '@/TransformDrive';

import type { TAnyLight } from './TAnyLight';
import type { TLightTransformAgents } from './TLightTransformAgents';

export type TAbstractLightWrapper<T extends TAnyLight> = TWrapper<T> &
  TWithObject3d &
  TWithTransformDrive<TLightTransformAgents> &
  Readonly<{
    getType: () => LightType;
  }>;
