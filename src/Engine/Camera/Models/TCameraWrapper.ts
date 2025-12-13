import type { TWrapper } from '@/Engine/Abstract';
import type { TMovable3dXYZ, TRotatable, TWithActiveMixin, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';

import type { TCamera } from './TCamera';
import type { TCameraAccessors } from './TCameraAccessors';

export type TCameraWrapper = TWrapper<TCamera> & TWithObject3d & TWithActiveMixin & TCameraAccessors & TMovable3dXYZ & TRotatable & TWithTagsMixin;
