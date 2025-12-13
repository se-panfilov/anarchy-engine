import type { IVector2, IVector3 } from '@Engine/Wrappers';

export type ILightAccessors = Readonly<{
  setPosition: (x: number, y: number, z: number) => IVector3;
  setCastShadow: (value: boolean) => boolean;
  setControls: (x: number, y: number, z: number) => IVector3;
  setShadowMapSize: (x: number, y: number) => IVector2;
  setFar: (value: number) => number;
  setNormalBias: (val: number) => number;
}>;
