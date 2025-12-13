import type { TReadonlyQuaternion, TReadonlyVector3 } from '@Engine/ThreeLib';

export type TReadonlyTransform = Readonly<{
  position: TReadonlyVector3;
  rotation: TReadonlyQuaternion;
  scale: TReadonlyVector3;
}>;
