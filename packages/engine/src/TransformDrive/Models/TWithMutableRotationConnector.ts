import type { QuaternionLike } from 'three';

import type { TEulerLike } from '@/ThreeLib';
import type { TWriteable } from '@/Utils';

export type TWithMutableRotationConnector = Readonly<{
  rotationEulerConnector: TWriteable<TEulerLike>;
  rotationQuaternionConnector: TWriteable<QuaternionLike>;
}>;
