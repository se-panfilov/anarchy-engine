import type { TWrapper } from '@/Engine/Abstract';
import type { TMovableXYZ, TRotatable, TWithActiveMixin, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';

import type { TCamera } from './TCamera';
import type { TCameraAccessors } from './TCameraAccessors';

export type TCameraWrapper = TWrapper<TCamera> & TWithObject3d & TWithActiveMixin & TCameraAccessors & TMovableXYZ & TRotatable & TWithTagsMixin;
