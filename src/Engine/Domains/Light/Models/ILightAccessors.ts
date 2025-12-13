import type { IVector2Wrapper, IVector3Wrapper } from '@/Engine/Domains/Vector';

export type ILightAccessors = Readonly<{
  setControls: (x: number, y: number, z: number) => IVector3Wrapper;
  setShadowMapSize: (x: number, y: number) => IVector2Wrapper;
  setFar: (value: number) => number;
  setNormalBias: (val: number) => number;
}>;
