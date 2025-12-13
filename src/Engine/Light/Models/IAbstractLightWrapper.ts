import type { TWrapper } from '@/Engine/Abstract';
import type { IMovable3dXYZ, IRotatable, IWithObject3d, IWithTagsMixin } from '@/Engine/Mixins';

import type { ILight } from './ILight';

export type IAbstractLightWrapper<T extends ILight> = TWrapper<T> & IWithObject3d & IMovable3dXYZ & IRotatable & IWithTagsMixin;
