import type { TMovable3dXYZ, TScaleMixin, TWithRotation } from '@/Engine/Mixins';

import type { TAbstractDriver } from './TAbstractDriver';

export type TAbstractInstantDriver = TAbstractDriver & TMovable3dXYZ & TWithRotation & TScaleMixin;
