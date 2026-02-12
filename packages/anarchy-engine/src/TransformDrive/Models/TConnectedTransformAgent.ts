import type { TSerializable } from '@Anarchy/Engine/Mixins';

import type { TAbstractTransformAgent } from './TAbstractTransformAgent';
import type { TSerializedTransform } from './TSerializedTransform';
import type { TWithMutablePositionConnector } from './TWithMutablePositionConnector';
import type { TWithMutableRotationConnector } from './TWithMutableRotationConnector';
import type { TWithMutableScaleConnector } from './TWithMutableScaleConnector';

export type TConnectedTransformAgent = TAbstractTransformAgent &
  TWithMutablePositionConnector &
  TWithMutableRotationConnector &
  TWithMutableScaleConnector &
  TSerializable<Readonly<TSerializedTransform>>;
