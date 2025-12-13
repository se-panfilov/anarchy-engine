import type { TWrapper } from '@/Engine/Abstract';
import type { TMovable3dXYZ, TRotatable, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';

import type { TLight } from './TLight';

export type TAbstractLightWrapper<T extends TLight> = TWrapper<T> & TWithObject3d & TMovable3dXYZ & TRotatable & TWithTagsMixin;
