import type { QuaternionLike } from 'three';

import type { TEulerLike } from '@/Engine/ThreeLib';
import type { TWriteable } from '@/Engine/Utils';

export type TWithMutableRotationConnector = Readonly<{
  rotationEulerConnector: TWriteable<TEulerLike>;
  rotationQuaternionConnector: TWriteable<QuaternionLike>;
}>;
