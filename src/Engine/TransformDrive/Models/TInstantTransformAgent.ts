import type { TAbstractInstantTransformAgent } from './TAbstractInstantTransformAgent';
import type { TWithMutablePositionConnector } from './TWithMutablePositionConnector';
import type { TWithMutableRotationConnector } from './TWithMutableRotationConnector';
import type { TWithMutableScaleConnector } from './TWithMutableScaleConnector';

export type TInstantTransformAgent = TAbstractInstantTransformAgent & TWithMutablePositionConnector & TWithMutableRotationConnector & TWithMutableScaleConnector;
