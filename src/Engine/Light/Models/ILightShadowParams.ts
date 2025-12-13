import type { IVector2 } from '@/Engine/Vector';

export type ILightShadowParams = Readonly<{
  mapSize: IVector2;
  camera: { far: number };
  normalBias: number;
}>;
