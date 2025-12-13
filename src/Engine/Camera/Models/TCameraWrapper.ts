import type { TWrapper } from '@/Engine/Abstract';
import type { TWithActiveMixin, TWithObject3d } from '@/Engine/Mixins';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TCamera } from './TCamera';
import type { TCameraTransformAgents } from './TCameraTransformAgents';
import type { TCommonCameraAccessors } from './TCommonCameraAccessors';

export type TCameraWrapper = TWrapper<TCamera> & TWithObject3d & TWithActiveMixin & TCommonCameraAccessors & TWithTransformDrive<TCameraTransformAgents>;
