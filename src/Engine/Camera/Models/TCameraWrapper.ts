import type { TWrapper } from '@/Engine/Abstract';
import type { IMovable3dXYZ, IRotatable, IWithActiveMixin, IWithObject3d, IWithTagsMixin } from '@/Engine/Mixins';

import type { TCamera } from './TCamera';
import type { TCameraAccessors } from './TCameraAccessors';

export type TCameraWrapper = TWrapper<TCamera> & IWithObject3d & IWithActiveMixin & TCameraAccessors & IMovable3dXYZ & IRotatable & IWithTagsMixin;
