import type { IVector2 } from '@/Engine/Wrappers';

export type ILightShadowParams = Readonly<{
  mapSize: IVector2;
  camera: { far: number };
  normalBias: number;
}>;
