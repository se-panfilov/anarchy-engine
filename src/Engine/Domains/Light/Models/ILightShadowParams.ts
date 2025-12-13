import type { IVector2 } from '@/Engine/Domains/Vector';

export type ILightShadowParams = Readonly<{
  mapSize: IVector2;
  camera: { far: number };
  normalBias: number;
}>;
