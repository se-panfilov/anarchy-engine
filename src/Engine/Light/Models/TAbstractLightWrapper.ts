import type { TWrapper } from '@/Engine/Abstract';
import type { TMovableXYZ, TRotatable, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';

import type { TLight } from './TLight';

export type TAbstractLightWrapper<T extends TLight> = TWrapper<T> & TWithObject3d & TMovableXYZ & TRotatable & TWithTagsMixin;
