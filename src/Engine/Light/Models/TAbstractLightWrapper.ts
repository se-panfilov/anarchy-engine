import type { TWrapper } from '@/Engine/Abstract';
import type { TRotatable, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TLight } from './TLight';
import type { TLightTransformAgents } from './TLightTransformAgents';

export type TAbstractLightWrapper<T extends TLight> = TWrapper<T> & TWithObject3d & TWithTransformDrive<TLightTransformAgents> & TRotatable & TWithTagsMixin;
