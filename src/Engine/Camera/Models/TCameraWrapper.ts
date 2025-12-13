import type { TWrapper } from '@/Engine/Abstract';
import type { TWithActiveMixin, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TCamera } from './TCamera';
import type { TCameraAccessors } from './TCameraAccessors';
import type { TCameraTransformAgents } from './TCameraTransformAgents';

export type TCameraWrapper = TWrapper<TCamera> & TWithObject3d & TWithActiveMixin & TCameraAccessors & TWithTransformDrive<TCameraTransformAgents> & TWithTagsMixin;
