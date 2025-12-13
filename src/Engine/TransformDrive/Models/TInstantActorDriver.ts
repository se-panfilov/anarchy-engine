import type { TAbstractInstantDriver } from './TAbstractInstantDriver';
import type { TWithMutablePositionConnector } from './TWithMutablePositionConnector';
import type { TWithMutableRotationConnector } from './TWithMutableRotationConnector';
import type { TWithMutableScaleConnector } from './TWithMutableScaleConnector';

export type TInstantActorDriver = TAbstractInstantDriver & TWithMutablePositionConnector & TWithMutableRotationConnector & TWithMutableScaleConnector;
