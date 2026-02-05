import type { TReadonlyQuaternion, TReadonlyVector3 } from '@hellpig/anarchy-engine/ThreeLib';

export type TReadonlyTransform = Readonly<{
  position: TReadonlyVector3;
  rotation: TReadonlyQuaternion;
  scale: TReadonlyVector3;
}>;
