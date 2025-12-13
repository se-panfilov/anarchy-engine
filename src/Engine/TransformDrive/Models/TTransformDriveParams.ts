import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';
import type { TransformDriver } from '@/Engine/TransformDrive/Constants';

export type TTransformDriveParams = Readonly<{
  driver: TransformDriver;
  position: TReadonlyVector3;
  rotation: TReadonlyEuler;
  scale: TReadonlyVector3;
  updateDelay: number;
  noiseThreshold: number;
}>;
