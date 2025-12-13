import type { TAbstractInstantDriver } from '@/Engine/Abstract';

import type { TWithMutablePositionConnector } from './TWithMutablePositionConnector';
import type { TWithMutableRotationConnector } from './TWithMutableRotationConnector';
import type { TWithMutableScaleConnector } from './TWithMutableScaleConnector';

export type TInstantActorDriver = TAbstractInstantDriver & TWithMutablePositionConnector & TWithMutableRotationConnector & TWithMutableScaleConnector;
