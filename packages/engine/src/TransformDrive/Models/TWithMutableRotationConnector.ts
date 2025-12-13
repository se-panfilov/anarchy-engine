import type { TEulerLike } from '@Engine/ThreeLib';
import type { TWriteable } from '@Engine/Utils';
import type { QuaternionLike } from 'three';

export type TWithMutableRotationConnector = Readonly<{
  rotationEulerConnector: TWriteable<TEulerLike>;
  rotationQuaternionConnector: TWriteable<QuaternionLike>;
}>;
