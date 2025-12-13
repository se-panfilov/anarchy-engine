import type { TReadonlyEuler, TReadonlyVector3 } from '@/Engine/ThreeLib';

export type TTransformAgentParams = Readonly<{
  position: TReadonlyVector3;
  rotation: TReadonlyEuler;
  scale: TReadonlyVector3;
  enabled?: boolean;
}>;
