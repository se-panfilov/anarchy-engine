import type { TWrapper } from '@/Engine/Abstract';
import type { TRotatable, TWithObject3d, TWithTagsMixin } from '@/Engine/Mixins';
import type { TWithTransformDrive } from '@/Engine/TransformDrive';

import type { TLight } from './TLight';

export type TAbstractLightWrapper<T extends TLight> = TWrapper<T> & TWithObject3d & TWithTransformDrive & TRotatable & TWithTagsMixin;
