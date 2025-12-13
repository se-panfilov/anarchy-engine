import type { TWrapper } from '@/Engine/Abstract';
import type { TRotatable, TWithActiveMixin, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TCamera } from './TCamera';
import type { TCameraAccessors } from './TCameraAccessors';

export type TCameraWrapper = TWrapper<TCamera> & TWithObject3d & TWithActiveMixin & TCameraAccessors & TWithTransformDrive & TRotatable & TWithTagsMixin;
