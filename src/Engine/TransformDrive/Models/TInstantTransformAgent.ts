import type { TMovable3dXYZ, TScaleMixin, TWithRotation } from '@/Engine/Mixins';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';
import type { TWithMutablePositionConnector } from './TWithMutablePositionConnector';
import type { TWithMutableRotationConnector } from './TWithMutableRotationConnector';
import type { TWithMutableScaleConnector } from './TWithMutableScaleConnector';

export type TInstantTransformAgent = TAbstractTransformAgent & TMovable3dXYZ & TWithRotation & TScaleMixin & TWithMutablePositionConnector & TWithMutableRotationConnector & TWithMutableScaleConnector;
