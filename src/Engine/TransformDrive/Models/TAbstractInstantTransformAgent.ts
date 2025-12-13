import type { TMovable3dXYZ, TScaleMixin, TWithRotation } from '@/Engine/Mixins';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';

export type TAbstractInstantTransformAgent = TAbstractTransformAgent & TMovable3dXYZ & TWithRotation & TScaleMixin;
