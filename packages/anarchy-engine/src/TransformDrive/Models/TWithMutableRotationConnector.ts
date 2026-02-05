import type { TEulerLike } from '@hellpig/anarchy-engine/ThreeLib';
import type { TWriteable } from '@hellpig/anarchy-shared/Utils';
import type { QuaternionLike } from 'three';

export type TWithMutableRotationConnector = Readonly<{
  rotationEulerConnector: TWriteable<TEulerLike>;
  rotationQuaternionConnector: TWriteable<QuaternionLike>;
}>;
