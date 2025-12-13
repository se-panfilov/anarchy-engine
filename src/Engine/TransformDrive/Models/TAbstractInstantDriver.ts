import type { TMovable3dXYZ, TScaleMixin, TWithRotation } from '@/Engine/Mixins';

import type { TAbstractTransformDriver } from './TAbstractTransformDriver';

export type TAbstractInstantDriver = TAbstractTransformDriver & TMovable3dXYZ & TWithRotation & TScaleMixin;
