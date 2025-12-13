import type { TEulerLike } from '@Anarchy/Engine/ThreeLib';
import type { TWriteable } from '@Anarchy/Shared/Utils';
import type { QuaternionLike } from 'three';

export type TWithMutableRotationConnector = Readonly<{
  rotationEulerConnector: TWriteable<TEulerLike>;
  rotationQuaternionConnector: TWriteable<QuaternionLike>;
}>;
