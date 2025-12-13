import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';

export type TTransformDriverParams = Readonly<{
  position: TReadonlyVector3;
  rotation: TReadonlyEuler;
  scale: TReadonlyVector3;
}>;
